$(function() {
    var promises = [];
    var volunteeringItems = [];
    var interviewsItems = [];

    // Orari in cui si effettuano i colloqui
    const interviewTimes = ["9:00", "10:00", "11:00", "12:00"];

    promises.push($.ajax({url: 'http://localhost:3000/volunteering', method: 'GET'}));
    promises.push($.ajax({url: 'http://localhost:3000/interviews', method: 'GET'}));

    Promise.all(promises)
    .then((results) => {
        volunteeringItems = results[0];
        interviewsItems = results[1];
        const positions = results[0].map(({ position }) => position);
        var uniquePositions = [ ...new Set(positions) ];
        $("#jobPosition").empty();
        $("#jobPosition").append('<option></option>');
        for(let i = 0; i < uniquePositions.length; i++) {
            var content = '<option value="' + uniquePositions[i] + '">' + uniquePositions[i] + '</option>';
            $("#jobPosition").append(content);
        }
    })
    .catch((err) => $("#serverErrorVol").html("Sorry something went wrong (" + err.status + ")"));

    $("#viewVolunteering").show();
    $("#bookVolunteering").hide();

    // Quando sceglie una posizione
    $("#jobPosition").change(function() {
        $("#jobShelter").empty();
        $("#requirements").empty();
        $("#jobShelter").append('<option></option>');
        var volunteeringsSelected = volunteeringItems.filter(item => item.position === $("#jobPosition").val());
        for(let i = 0; i < volunteeringsSelected.length; i++) {
            var content = '<option value="' + volunteeringsSelected[i]["shelter"] + '">' + volunteeringsSelected[i]["shelter"] + '</option>';
            $("#jobShelter").append(content);
        }
    });

    // Quando sceglie un rifugio
    $("#jobShelter").change(function() {
        $("#requirements").empty();
        var volunteeringsSelected = volunteeringItems.filter(item => item.position === $("#jobPosition").val());
        var volunteeringSelected = volunteeringsSelected.filter(item => item.shelter === $("#jobShelter").val());
        for(let i = 0; i < volunteeringSelected[0]["requirements"].length; i++) {
            var content = '<ul>' + volunteeringSelected[0]["requirements"][i] + '</ul>';
            $("#requirements").append(content);
        }
    });

    // Quando clicca su Book
    $("#jobBook").on("click", function() {
        if(checkPositionSelected()) {
            $("#viewVolunteering").hide();
            $("#bookVolunteering").show();
            $("#txtDate").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                beforeShowDay: $.datepicker.noWeekends,
                minDate: 1,
                onSelect: function(d,i){
                    if(d !== i.lastVal){
                        $(this).change();
                    }
               }
            });
        } else {
            $("#positionNotSelected").html("Please select a position and a shelter");
        }
    })

    // Quando sceglie un giorno
    $("#txtDate").change(function() {
        $("#interviewTime").show();
        $("#dateUnavailable").empty();
        $("#interviewTime").empty();
        getAvailableTimes();
    });

    // Quando clicca su Submit
    /* $("#jobSubmit").on("click", function() {
        var formCompleted = checkComplete();
        if(formCompleted) {
            $.ajax({
                url: 'http://localhost:3000/addInterview',
                type: 'post',
                data: {
                    position: $('#jobPosition').val(),
                    shelter: $('#jobShelter').val(),
                    cv: $('#cv').val(),
                    date: $("#txtDate").val(),
                    time: $("#interviewTime").val()
                },
                headers: {
                    token: localStorage.getItem('token')
                },
            })
            .done(function() {
                console.log("prima")
                emptyForm();
                console.log("dopo")
            })
            .fail(function(err) {
                $("#serverErrorVol").html("Sorry something went wrong (" + err.status + ")")
            })
        } else {
            $("#formNotCompleted").html("Please fill in all the fields");
        }
    }) */

    function checkPositionSelected() {
        if($('#jobPosition').val() && $('#jobShelter').val()) {
            return true;
        }
        return false;
    }

/*     function checkComplete() {
        if($('#jobPosition').val() && $('#jobShelter').val() && $('#cv').val() && $("#txtDate").val() && $("#interviewTime").val()) {
            return true;
        }
        return false;
    } */

/*     function emptyForm() {
        $("#jobPosition").empty();
        $("#jobShelter").empty();
        $("#requirements").empty();
        $("#positionNotSelected").empty();
        $("#cv").val('');
        $("#txtDate").val('');
        $("#interviewTime").empty();
        $("#formNotCompleted").empty();
        $("#txtDate").datepicker("destroy");
    } */

    function getAvailableTimes() {
        var availableTimes = interviewTimes;
        for(let i = 0; i < interviewsItems.length; i++) {
            if(interviewsItems[i].date === $("#txtDate").val() && interviewsItems[i].position === $('#jobPosition').val() && interviewsItems[i].shelter === $('#jobShelter').val()) {
                var toRemove = interviewsItems[i].bookedTimes;
                availableTimes = interviewTimes.filter( function( el ) {
                    return !toRemove.includes( el );
                } );
                break;
            }
        }
        if(availableTimes.length === 0) {
            $("#interviewTime").hide();
            $("#dateUnavailable").html("No available times for this day");
        } else {
            for(let i = 0; i < availableTimes.length; i++) {
                $("#interviewTime").append('<option>' + availableTimes[i] + '</option>');
            }
        }
    }

});