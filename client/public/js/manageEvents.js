var table = null;

$(function() {
    table = $('#eventsList').DataTable( {
        scrollX: true,
        ajax: {
            url: 'http://localhost:3000/getEvents',
            dataSrc: ''
        },
        columns: [ 
            { data: 'name' },
            { data: 'place' },
            { data: 'date' },
            { data: null }
        ],
        columnDefs: [
            {
                targets: -1,
                data: null,
                orderable: false,
                defaultContent: '<button class="deleteEvent">Delete</button>',
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
    var modal = document.getElementById('modalDeleteEvent');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Delete button opens the modal
$('#eventsList tbody').on('click', 'button', function () {
    $('#modalDeleteEvent').show();
    selectedRow = table.row($(this).parents('tr'));
});

$("#confirmDeleteButton").on("click", function() {
    var data = selectedRow.data();
    $.ajax({
        url: 'http://localhost:3000/deleteEvent/:' + data["name"],
        type: 'DELETE'
    }).done(function() {
        selectedRow.remove().draw();
        $('#modalDeleteEvent').hide();
    }).fail(function() {
        console.log("Delete failed");
        $('#modalDeleteEvent').hide();
    })
})

$("#cancelButton").on("click", function() {
    $('#modalDeleteEvent').hide();
})

$("#closeButton").on("click", function() {
    $('#modalDeleteEvent').hide();
})

function updatePhoto(input) {
    if(input.files.length != 0 && input.files[0].size / 1000 > 60) {
        $('#newEventPhoto').val('');
        $("#errorNewEvent").html("The maximum file size is 60KB.");
    } else {
        var reader = new FileReader();            
        reader.onload = function (e) {
            $("#srcPhoto").val(e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}