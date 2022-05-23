$(function() {
    var volunteeringItems = [];
    var interviewsItems = [];

    var selectedPosition = "";
    var selectedShelter = "";

    $.getJSON('http://localhost:3000/volunteering', getVolunteer)
    .fail(function(jqXHR, textStatus, errorThrown) { $("#serverErrorVol").html("Sorry something went wrong(" + errorThrown + ")") });
    $.getJSON('http://localhost:3000/interviews', getInterviews)
    .fail(function(jqXHR, textStatus, errorThrown) { $("#serverErrorVol").html("Sorry something went wrong (" + errorThrown + ")") });

    function getVolunteer(volunteer) {
        volunteeringItems = volunteer;
        const positions = volunteer.map(({ position }) => position);
        var uniquePositions = [ ...new Set(positions) ];
        for(let i = 0; i < uniquePositions.length; i++) {
            var content = '<option value="' + uniquePositions[i] + '">' + uniquePositions[i] + '</option>';
            $("#jobPosition").append(content);
        }
    }

    function getInterviews(interviews) {
        interviewsItems = interviews;
    }

    $("#txtDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        beforeShowDay: $.datepicker.noWeekends
    });

    // Quando sceglie una posizione
    $("#jobPosition").change(function() {
        selectedPosition = $("#jobPosition").val();
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
        selectedShelter =  $("#jobShelter").val();
        $("#requirements").empty();
        var volunteeringsSelected = volunteeringItems.filter(item => item.position === $("#jobPosition").val());
        var volunteeringSelected = volunteeringsSelected.filter(item => item.shelter === $("#jobShelter").val());
        for(let i = 0; i < volunteeringSelected[0]["requirements"].length; i++) {
            var content = '<ul>' + volunteeringSelected[0]["requirements"][i] + '</ul>';
            $("#requirements").append(content);
        }
    });

    // Quando clicca per prenotare

    // Quando sceglie un giorno

    // Quando sceglie un orario

    // Quando invia la richiesta
    $("#jobSubmit").on("click", function() {
        var formCompleted = checkComplete();
        if(formCompleted) {
            alert("ok")
            emptyForm();
        } else {
            $("#formNotCompleted").html("Please fill in all the fields");
        }
    })

    function checkComplete() {
        if($('#jobPosition').val() && $('#jobShelter').val() && $('#cv').val()) {
            return true;
        }
        return false;
    }

    function emptyForm() {
        $("#jobPosition").val('').change();
        $("#formNotCompleted").empty();
        $("#jobShelter").empty();
        $("#requirements").empty();
        $("#cv").val('');
    }

});