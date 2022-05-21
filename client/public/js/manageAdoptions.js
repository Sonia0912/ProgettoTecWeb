var table = null;

$(function() {
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
});

var selectedRow = null;

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
        console.log("Delete failed");
        $('#modalDeletePet').hide();
    })
})

$("#cancelButton").on("click", function() {
    $('#modalDeletePet').hide();
})

$("#closeButton").on("click", function() {
    $('#modalDeletePet').hide();
})

function updatePhoto(input) {
    if(input.files.length != 0 && input.files[0].size / 1000 > 60) {
        $('#newPetPhoto').val('');
        $("#errorNewPet").html("The maximum file size is 60KB.");
    } else {
        var reader = new FileReader();            
        reader.onload = function (e) {
            $("#srcPhoto").val(e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}