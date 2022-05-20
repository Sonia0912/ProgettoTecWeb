$(function() {
    $('#usersList').DataTable( {
        scrollX: true,
        ajax: {
            url: 'http://localhost:3000/getUsers',
            dataSrc: 'users'
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