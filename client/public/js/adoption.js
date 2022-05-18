var dogs = [];
var cats = [];

var promises = [];

var selectedType = ".dog";
// 0 none, 1 female, 2 male, 3 both
var selectedGender = 3;
var selectedAge = [0, 30];

$(function() {
    // filter by age
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 20,
        values: [ 0, 20 ],
        slide: function(event, ui) {
            selectedAge[0] = ui.values[0];
            selectedAge[1] = ui.values[1];
            $("#age").val(ui.values[0] + " - " + ui.values[1]);
            switch (selectedGender) {
                case 1:
                    filterResults(ui.values[0], ui.values[1], ".female");
                    break;
                case 2:
                    filterResults(ui.values[0], ui.values[1], ".male");
                    break;
                case 3:
                    filterResults(ui.values[0], ui.values[1], ".female");
                    filterResults(ui.values[0], ui.values[1], ".male");
                    break;
            }      
        }
    });
    $("#age").val($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));

    // filter by gender
    $('#female').on("change", function() {
        if(this.checked) {
            filterResults(selectedAge[0], selectedAge[1], ".female");
            selectedGender += 1;
        } else {
            $(selectedType).filter(".female").hide();
            $(selectedType).filter(".female").parent().hide();
            selectedGender -= 1;
        }       
    });
    $('#male').on("change", function() {
        if(this.checked) {
            filterResults(selectedAge[0], selectedAge[1], ".male");
            selectedGender += 2;
        } else {
            $(selectedType).filter(".male").hide();
            $(selectedType).filter(".male").parent().hide();
            selectedGender -= 2;
        }       
    });

});

promises.push($.ajax({url: 'http://localhost:3000/dogsForAdoption', method: 'GET'}));
promises.push($.ajax({url: 'http://localhost:3000/catsForAdoption', method: 'GET'}));

Promise.all(promises)
.then((results) => {
    dogs = results[0];
    cats = results[1];
    loadPets(true);
    loadPets(false);
    $(".cat").hide();
})
.catch((err) => console.log(err));

// filter by type
$("#filterDog").on("click", function() {
    $("#filterDog").addClass("activeBtn");
    $("#filterCat").removeClass("activeBtn");
    $(".dog").show();
    $(".dog").parent().show();
    $(".cat").hide();
    $(".cat").parent().hide();
    selectedType = ".dog";
    resetAdvancedFilters();
})
$("#filterCat").on("click", function() {
    $("#filterCat").addClass("activeBtn");
    $("#filterDog").removeClass("activeBtn");
    $(".cat").show();
    $(".cat").parent().show();
    $(".dog").hide();
    $(".dog").parent().hide();
    selectedType = ".cat";
    resetAdvancedFilters();
})

$("#advancedFilterBtn").on("click", function() {
    if($("#advancedFilters").is(":visible")) {
        $(".advFilter").css("height", "60px");
        $(".relativeContainerHeight").css("height", "60px");
        $("#advancedFilters").hide();
    } else {
        $(".advFilter").css("height", "280px");
        $(".relativeContainerHeight").css("height", "200px");
        $("#advancedFilters").show();
    }
})

function loadPets(loadDogs) {
    if(loadDogs) {
        var pets = dogs;
        var type = "dog";
    } else {
        var pets = cats;
        var type = "cat";
    }
    var content = '';
    for(let i = 0; i < pets.length; i++) {
        genderIcon = (pets[i]["gender"] == "male") ? "/icons/ic_male.png" : "/icons/ic_female.png";
        content =       '<div class="petItem ' + type + " " + pets[i]["gender"] + " " + pets[i]["age"] + '">';
        content +=          '<div class="petPhoto"><img src="' + pets[i]["photo"] + '"></div>';
        content +=          '<div class="petName">' + pets[i]["name"] + '</div>';
        content +=          '<div class="petAgeGender">' + pets[i]["age"] + ' <img class="genderIcon" src="' + genderIcon + '"></div>';
        content +=      '</div>';
        $("#" + type + i).append(content);
    }
}

function resetAdvancedFilters() {
    $("#female").prop("checked", true);
    $("#male").prop("checked", true);
    $("#slider-range").slider({
        values: [ 0, 20 ]
    });
    $("#age").val("0 - 20");
    selectedGender = 3;
    selectedAge = [0, 30];
}

function filterResults(min, max, selectedGender) {
    for(let i = min; i <= max; i++) {
        $(selectedType + selectedGender).filter("." + i).show();
        $(selectedType + selectedGender).filter("." + i).parent().show();
    }
    for(let i = 0; i < min; i++) {
        $(selectedType + selectedGender).filter("." + i).hide();
        $(selectedType + selectedGender).filter("." + i).parent().hide();
    }
    for(let i = max + 1; i <= 20; i++) {
        $(selectedType + selectedGender).filter("." + i).hide();
        $(selectedType + selectedGender).filter("." + i).parent().hide();
    }
}