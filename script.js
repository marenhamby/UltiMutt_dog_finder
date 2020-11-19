//make sure the page has loaded before starting anything
$(document).ready(function () {

    //create global variables for the results that come in from the quiz
    var age = [];
    var gender = [];
    var size = [];
    var city;
    var state;


    //on load, hide the quiz section
    $("#quiz").hide();

    //function that builds url based on filtered search
    function buildQueryURL() {

        var queryURL = "https://petproxy.herokuapp.com/animals?";
        var queryParams = { "type": "dog" };

        //Check if age array has values then sets age array values to the key "age"
        if (age.length) {
            queryParams.age = age.join(",");
        }
        //Check if gender array has values then sets gender array values to the key "gender"
        if (gender.length) {
            queryParams.gender = gender.join(",");
        }
        //Check if size array has values then sets size array values to the key "size"
        if (size.length) {
            queryParams.size = size.join(",");
        }

        if(city && state){
            //set query param for location
            queryParams.location = city + ", " + state;
        }
        
        console.log(queryURL + $.param(queryParams));
        return queryURL + "&" + $.param(queryParams);
    }



    // create on-click function to open the quiz
    $("#startQuiz").on("click", function (event) {
        event.preventDefault();

        //show quiz content and hide the button to start the quiz
        $("#quiz").show();
        $("#startQuiz").hide();
    });

    //create on-click function for the submit button for the quiz, and hide the quiz to display results info
    $("#submitQuiz").on("click", function (event) {
        event.preventDefault();

        //hide the quiz content
        $("#quiz").hide();
        $("#centers").show();
        //unhide the results


        //create if statements to change the value of age depending on which age is checked
        if ($(".baby").is(":checked")) {
            age.push("baby")
        };
        if ($(".young").is(":checked")) {
            age.push("young")
        };
        if ($(".adult").is(":checked")) {
            age.push("adult")
        };
        if ($(".senior").is(":checked")) {
            age.push("senior")
        };
        console.log(age);

        //create if statements to change the value of gender depending on which gender is checked
        if ($(".male").is(":checked")) {
            gender.push("male")
        };
        if ($(".female").is(":checked")) {
            gender.push("female")
        };
        if ($(".either").is(":checked")) {
            gender.push("male");
            gender.push("female")
        };
        console.log(gender);

        //create if statements to change the value of size depending on which size is checked
        if ($(".small").is(":checked")) {
            size.push("small")
        };
        if ($(".medium").is(":checked")) {
            size.push("medium")
        };
        if ($(".large").is(":checked")) {
            size.push("large")
        };
        if ($(".X-large").is(":checked")) {
            size.push("x-large")
        };
        console.log(size);

        //assign values to sity and state variable based on input
        city = $("#city").val();
        state = $("#state").val();

        //make api call to get the adoption info from results of input fields
        var queryURL = buildQueryURL();

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response)

            //add looped tiles for results from the api call 
            console.log(response.animals)
            for (var i = 0; i < 5; i++) {
                var output = response.animals[i];
                document.querySelector('#centerOutput').innerHTML +=

                    `<div class="dog-type has-text-centered" id='center-one'>
                    <h1 class="has-text-centered dog-name">Dog Name: ${output.name}</h1>
                    <h4 class="dog-type">Breed: ${output.breeds.primary}</h4>
                    <h4 class="age">Age: ${output.age}</h4>
                    <h4 class="gender">Gender: ${output.gender}</h4>
                    <h4 class="size">Size: ${output.size}</h4>
                    <a class='has-text-centered" id="location-name location-link' href="${output.url}">
                        <h3>Location Center Link</h3>
                    </a>
                    <label class="has-text-centered" id="city-state-zip">
                        <h4>
                        ${output.contact.address.city}, ${output.contact.address.state}
                        </h4>
                    </label>
                    <div class='has-text-centered'>
                        <button class="button is-info is-rounded is-large save-button" id='saveBtn'>Save</button>
                    </div>
                </div>
                <br><br>`

            };

            // <img src="${response.photos[0].medium}.png" class="image">

        }).then(function(){
            $(".save-button").on("click", function(event){
                var element = $(this).parent().parent()[0];
                localStorage.setItem(element.id, element.outerHTML);
            });
        });

    });


    //add api call to gether the breed list info
    listURL = "https://api.thedogapi.com/v1/breeds?api_key=fc1579f0-3bd7-47b7-8946-72cbf49fb328"
    $.ajax({
        url: listURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        //create for loop to pull the names from the api call and populate them in a new dropdown field on the breed page
        for (var i = 0; i < response.length; i++) {
            var breedName = response[i].name;

            //create variable for the new breed options to populate in the dropdown list
            var newOption = $("<option>");
            newOption.text(breedName);

            //append the breed entry to the list in the dropdown
            $("#breed-search").append(newOption);
        }
    });



    // create on-click function to take in input value of search and display dog breed info
    $("#chooseBtn").on("click", function (event) {
        event.preventDefault();
        var breed = $("#breed-search option:selected").val();
        console.log(breed);

        var queryURL = "https://api.thedogapi.com/v1/breeds/search?api_key=fc1579f0-3bd7-47b7-8946-72cbf49fb328&q="
            + breed;
        var id;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response)
            var breed = response[0];
            //Change dog breed
            $(".dog-breed").text(breed.name);

            //change height, weight, and temperament
            $(".breed-size").text("Height: " + breed.height.imperial + "in.");

            $(".weight").text("Weight: " + breed.weight.imperial + "lbs");

            if (breed.name === "Poodle (Miniature)" || breed.name === "Poodle (Toy)") {
                var poodleURL = "https://api.thedogapi.com/v1/breeds/search?api_key=fc1579f0-3bd7-47b7-8946-72cbf49fb328&q=poodle"
                $.ajax({
                    url: poodleURL,
                    method: "GET"
                }).then(function(response) {
                    $(".temperament").text("Temperament: " + response[0].temperament);
                    console.log(response[0].temperament)    
                })

            } else {
                $(".temperament").text("Temperament: " + breed.temperament);
    
            }

            id = breed.id;

            //change url to get data that holds the picture using the id retrieved from the old url
            var imageURL = "https://api.thedogapi.com/v1/images/search?api_key=fc1579f0-3bd7-47b7-8946-72cbf49fb328&breed_id="
                + id;

            //second ajax call using image url
            $.ajax({
                url: imageURL,
                method: "GET",
            }).then(function (response) {
                console.log(response[0].url);

                $("#breed-image").attr("src", (response[0].url));

            });

        });


    });

});