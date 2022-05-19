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

/*     $.getJSON('http://localhost:3000/users', getUsers);
  
    function getUsers(users) {
        for(let i = users.length - 1; i >= 0; i--) {
            var content =             
            '<div class="row userInfo">' +
                '<div class="col-md-1 userEmail">' + users[i]["author"] + '</div>' +
                '<div class="col-md-1 userPassword">' + users[i]["date"] + '</div>' +
                '<div class="col-md-1 userName">' + users[i]["date"] + '</div>' +
                '<div class="col-md-1 userSurname">' + users[i]["text"] + '</div>' +
                '<div class="col-md-1 userQuizScore">' + users[i]["quizScore"] + '</div>' +
                '<div class="col-md-1 userHangmanScore">' + users[i]["hangmanScore"] + '</div>' +
            '</div>';
            $("#usersList").append(content);
        }  
    } */
});