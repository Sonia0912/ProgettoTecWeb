var table = null;
var selectedRow = null;

$(function() {
    createTable();
    $("#newVolForm").hide();
    $("#addVol").on("click", function() {
        if($("#newVolForm").is(":visible")) {
            $("#newVolForm").hide();
        } else {
            $("#newVolForm").show();
        }     
    })
});

$('#newVolForm').submit(function(e) {
    checked = $("input[type=checkbox]:checked").length;
    if(!checked) {
        e.preventDefault();
        $("#missingReq").html("Select at least one requirement");
    }
    else {
        e.preventDefault(); // don't submit multiple times
        this.submit(); // use the native submit method of the form element
        var newVol = {
            position: $("#newVolPosition").val(),
            shelter: $("#newVolShelter").val(),
        }
        table.row.add(newVol).draw(false);
        setTimeout(function(){ // Delay for Chrome
            emptyForm();
        }, 100);
    }
})

function createTable() {
    table = $('#volsList').DataTable( {
        scrollX: true,
        ajax: {
            url: 'http://localhost:3000/volunteering',
            dataSrc: ''
        },
        columns: [ 
            { data: 'position' },
            { data: 'shelter' },
            { data: null }
        ],
        columnDefs: [
            {
                targets: -1,
                data: null,
                orderable: false,
                defaultContent: '<button class="deleteVol">Delete</button>',
            },
            {
                "width": "130px", "targets": [0, 1]
            }
        ]
    } );
}

function emptyForm() {
    $("#newVolPosition").val('');
    $("#newVolShelter").val('');
    $("#missingReq").empty();
    $('input[name="requirements"]').each(function() {
        this.checked = false;
    });
    $("#newVolForm").hide();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('modalDeleteVolunteering');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Delete button opens the modal
$('#volsList tbody').on('click', 'button', function () {
    $('#modalDeleteVolunteering').show();
    selectedRow = table.row($(this).parents('tr'));
});

$("#confirmDeleteButton").on("click", function() {
    var data = selectedRow.data();
    $.ajax({
        url: 'http://localhost:3000/deleteVolunteering/' + data["position"] + '/' + data["shelter"],
        type: 'DELETE'
    }).done(function() {
        selectedRow.remove().draw();
        $('#modalDeleteVolunteering').hide();
    }).fail(function() {
        console.log("Delete failed");
        $('#modalDeleteVolunteering').hide();
    })
})

$("#cancelButton").on("click", function() {
    $('#modalDeleteVolunteering').hide();
})

$("#closeButton").on("click", function() {
    $('#modalDeleteVolunteering').hide();
})