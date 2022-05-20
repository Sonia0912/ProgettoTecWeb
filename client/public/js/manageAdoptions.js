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

$('#petsList tbody').on('click', 'button', function () {
    var selectedRow = table.row($(this).parents('tr'));
    var data = selectedRow.data();
    $.ajax({
        url: 'http://localhost:3000/deletePet/' + data["type"] + '/' + data["name"],
        type: 'DELETE'
    }).done(function() {
        selectedRow.remove().draw();
    }).fail(function() {
        console.log("Delete failed")
    })
});

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