var table = null;
var selectedRow = null;

$(function () {
    createTable();
    $('#newEventForm').hide()
    $('#addEvent').on("click", function () {
        if ($('#newEventForm').is(":visible")) {
            $('#newEventForm').hide();
        } else {
            $('#newEventForm').show();
        }
    })
});

function createTable() {
    table = $('#eventsList').DataTable({
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
    });
}

$('#newEventForm').submit(function (e) {
    var newEvent = {
        name: $("#newEventName").val(),
        place: $("#newEventPlace").val(),
        date: $("#newEventDate").val()
    }
    table.row.add(newEvent).draw(false);


});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
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

$("#confirmDeleteButton").on("click", function () {
    var data = selectedRow.data();
    $.ajax({
        url: 'http://localhost:3000/deleteEvent/' + data["name"],
        type: 'DELETE'
    }).done(function () {
        selectedRow.remove().draw();
        $('#modalDeleteEvent').hide();
    }).fail(function () {
        console.log("Delete failed");
        $('#modalDeleteEvent').hide();
    })
})

$("#cancelButton").on("click", function () {
    $('#modalDeleteEvent').hide();
})

$("#closeButton").on("click", function () {
    $('#modalDeleteEvent').hide();
})
