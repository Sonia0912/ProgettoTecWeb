$(function() {
    $('#usersList').DataTable( {
        scrollX: true,
        ajax: {
            url: 'http://localhost:3000/getUsers',
            dataSrc: 'users',
            error: function(err) {
                $("#serverErrorMUsers").html("Sorry something went wrong (" + err.status + ")")
            }
        },
        columns: [ 
            { data: 'email' },
            { data: 'name' },
            { data: 'surname' },
            { data: 'quizScore' },
            { data: 'hangmanScore' }
        ]
    } );
});