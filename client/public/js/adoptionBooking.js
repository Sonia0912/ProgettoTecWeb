$(function() {

    var selectedPet = getSelectedPet();
    var bookedVisits = [];
    // Orari in cui si effettuano le visite
    const visitTimes = ["13:00", "14:00", "15:00", "16:00", "17:00"];

    // Get visits booked with that pet
    $.get('http://localhost:3000/visits/' + selectedPet)
    .then((res) => {
        bookedVisits = res;
    })
    .catch((err) => { $("#serverErrorBookAdop").html("Sorry something went wrong (" + err.status + ")") })

    // Make the text input a date input
    $("#visitDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        beforeShowDay: $.datepicker.noWeekends,
        minDate: 1,
        maxDate: 7,
        onSelect: function(d,i){
            if(d !== i.lastVal){
                $(this).change();
            }
       }
    });

    // Quando sceglie un giorno
    $("#visitDate").change(function() {
        $("#visitTime").empty();
        $("#dateUnavailable").empty();
        getAvailableTimes();
    });

    // Inserisce gli orari disponibili per il giorno selezionato nella select
    function getAvailableTimes() {
        var availableTimes = visitTimes;
        for(let i = 0; i < bookedVisits.length; i++) {
            if(bookedVisits[i].date === $("#visitDate").val()) {
                var toRemove = bookedVisits[i].times;
                availableTimes = visitTimes.filter( function( el ) {
                    return !toRemove.includes( el );
                } );
                break;
            }
        }
        if(availableTimes.length === 0) {
            $("#dateUnavailable").html("No available times for this day");
        } else {
            $("#visitTime").append('<option></option>');
            for(let i = 0; i < availableTimes.length; i++) {
                $("#visitTime").append('<option>' + availableTimes[i] + '</option>');
            }
        }
    }

    function getSelectedPet() {
        var currentURL = $(location).attr('href'); 
        var arr = currentURL.split("/");
        return arr[arr.length - 1];
    }

})