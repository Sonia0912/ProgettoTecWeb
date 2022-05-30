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
            $('#newEventDate').datepicker({
                minDate: 1
            })
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
            { data: 'bookedSeat' },
            { data: 'totSeat' },
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
                "width": "170px", "targets": 1
            },
            {
                "width": "100px", "targets": 2
            }
        ],
        "createdRow": function (row, data, index) {
            if (data.bookedSeat == data.totSeat) {
                $(row).addClass('notAvaibleEvent');
            }
        }
    });
}

function emptyForm() {
    $("#newEventName").val('');
    $("#newEventDate").val('');
    $("#newEventDate").val('');
    $("#newEventPlace").val('');
    $("#newEventPrice").val('');
    $('#newEventPrice').val('');
    $('#descriptionEvent').val('');
    $('#newEventSeats').val('');
    $('#newEventPhoto').val('');
    $('#newEventCategory').val('');
    $("#newEventForm").hide();
}

$('#newEventForm').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action'); //get submit url 
    $.ajax({
         type: "POST",
         url: url,
         data: form.serialize(), // serializes form input
         success: () => {
            var newEvent = {
                name: $("#newEventName").val(),
                place: $("#newEventPlace").val(),
                date: $("#newEventDate").val(),
                totSeat: $('#newEventSeats').val(),
                bookedSeat: 0
            }
            table.row.add(newEvent).draw(false);
            setTimeout(function () {
                emptyForm();
            }, 100);
         },
         error: function(err){
             $("#addEventError").html(err.responseJSON.error)
         }
    });
})

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
        $("#serverErrorManageEvent").html("Sorry something went wrong (" + err.status + ")")
        $('#modalDeleteEvent').hide();
    })
})

$("#cancelButton").on("click", function () {
    $('#modalDeleteEvent').hide();
})

$("#closeButton").on("click", function () {
    $('#modalDeleteEvent').hide();
})