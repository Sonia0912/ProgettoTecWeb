var table = null;
var selectedRow = null;

$(function() {
    createTable();
    $("#newPetForm").hide();
    $("#addPet").on("click", function() {
        if($("#newPetForm").is(":visible")) {
            $("#newPetForm").hide();
        } else {
            $("#newPetForm").show();
        }     
    })
});

$('#newPetForm').submit(function(e) {
    e.preventDefault();
    this.submit();
    var newPet = {
        name: $("#newPetName").val(),
        age: $("#newPetAge").val(),
        type: $('input[name="type"]:checked').val(),
        shelter: $("#newPetShelter").val()
    }
    table.row.add(newPet).draw(false);
    setTimeout(function(){
        emptyForm();
    }, 100);
})

function createTable() {
    table = $('#petsList').DataTable( {
        scrollX: true,
        ajax: {
            url: 'http://localhost:3000/getPets',
            dataSrc: ''
        },
        columns: [ 
            { data: 'name' },
            { data: 'age' },
            { data: 'type' },
            { data: 'shelter' },
            { data: null }
        ],
        columnDefs: [
            {
                targets: -1,
                data: null,
                orderable: false,
                defaultContent: '<button class="deletePet">Delete</button>',
            },
            {
                "width": "170px", "targets": 3
            }
        ]
    } );
}

function emptyForm() {
    $("#newPetName").val('');
    $("#newPetDescription").val('');
    $("#newPetAge").val('');
    $("#newPetPhoto").val('');
    $("#dog").prop("checked", true);
    $("#female").prop("checked", true);
    $("#newPetForm").hide();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('modalDeletePet');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Delete button opens the modal
$('#petsList tbody').on('click', 'button', function () {
    $('#modalDeletePet').show();
    selectedRow = table.row($(this).parents('tr'));
});

$("#confirmDeleteButton").on("click", function() {
    var data = selectedRow.data();
    $.ajax({
        url: 'http://localhost:3000/deletePet/' + data["type"] + '/' + data["name"],
        type: 'DELETE'
    }).done(function() {
        selectedRow.remove().draw();
        $('#modalDeletePet').hide();
    }).fail(function() {
        $('#modalDeletePet').hide();
    })
})

$("#cancelButton").on("click", function() {
    $('#modalDeletePet').hide();
})

$("#closeButton").on("click", function() {
    $('#modalDeletePet').hide();
})