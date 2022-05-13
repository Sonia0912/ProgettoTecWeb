$(function() {
    $.getJSON('posts', getPosts);
  
    $('.post-form').on("submit", function(e) {
        e.preventDefault();
        $.post('posts', {
            text: $('#text').val(),
            img: $('#imgUploaded').attr('src'),
        }, getLastPost)
        .fail(function(response) {
            $("#errorPost").html("The maximum file size is 60KB.");
        });
    });
  
    function getPosts(posts) {
        for(let i = posts.length - 1; i >= 0; i--) {
            var content =             
            '<div class="post">' +
                '<div class="postAuthor">' + posts[i]["author"] + '</div>' +
                '<div class="postDate">' + posts[i]["date"] + '</div>' +
                '<div class="postText">' + posts[i]["text"] + '</div>';
            if(posts[i]["img"] != undefined) {
                content += '<div class="postImg"><img src="' + posts[i]["img"] + '" /></div>';
            }
            content += '</div>';
    
            $("#posts").append(content);
        }  
    }

    function getLastPost(posts) {
        $('#imgUploaded').hide();
        $("#errorPost").empty();
        var index = posts.length - 1;
        var content =             
        '<div class="post">' +
            '<div class="postAuthor">' + posts[index]["author"] + '</div>' +
            '<div class="postDate">' + posts[index]["date"] + '</div>' +
            '<div class="postText">' + posts[index]["text"] + '</div>';
        if(posts[index]["img"] != undefined) {
            content += '<div class="postImg"><img src="' + posts[index]["img"] + '" /></div>';
        }
        content += '</div>';
        $('#text').val('');
        $("#posts").prepend(content);
    }

});

$('#img').on("click", function() {
    $("#errorPost").empty();
})

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        $('#imgUploaded').show();
        $('#imgUploaded').attr('src', e.target.result);
      };
  
      reader.readAsDataURL(input.files[0]);
    }
}

var curPostsLoaded = 0;

$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
    if(scrollPosition + 280 >= scrollHeight) {
        curPostsLoaded += 5;
        $.get('/moreposts/' + curPostsLoaded, function(posts, status) {
            for(let i = posts.length - 1; i >= 0; i--) {
                var content =             
                '<div class="post">' +
                    '<div class="postAuthor">' + posts[i]["author"] + '</div>' +
                    '<div class="postDate">' + posts[i]["date"] + '</div>' +
                    '<div class="postText">' + posts[i]["text"] + '</div>';
                if(posts[i]["img"] != undefined) {
                    content += '<div class="postImg"><img src="' + posts[i]["img"] + '" /></div>';
                }
                content += '</div>';        
                $("#posts").append(content);
            }  
            if(posts.length < 5) {
                $(window).off('scroll'); 
            }
        });
    }
});