//  $(window).on("scroll", function() {

//     var type = "cat";
//     if(document.getElementById('dogFacts')){
//         type = "dog"
//     }else if(document.getElementById('snailFacts')){
//         type = "snail"
//     }else if(document.getElementById('horseFacts')){
//         type="horse"
//     }



//     var scrollHeight = $(document).height();
//     var scrollPosition = $(window).height() + $(window).scrollTop();
//     if (scrollPosition + 550 >= scrollHeight) {
       
//         $.get('http://localhost:3000/moreFacts/' + type, function (facts) {
//             for(let i = facts.length - 1; i >= 0; i--) {
//                 var content =
//                ' <div class="fact">' + 
//                 facts[i].text +
//                 '<button v-if="login" class="publishFactBtn" @click="postOnDashboard("'+facts[i].text+')"> Post </button>' +
//                 '</div>';

//                 console.log(content)
//                 $("#otherFacts").append(content);

//             if (facts.length < 5) {
//                 $(window).off('scroll');
//             }
//         }
//         })
//             .fail(function (err) {
//                 $(".serverError").html("Sorry, something went wrong (" + err + ")")
//             });
//     }
    

//  });


 