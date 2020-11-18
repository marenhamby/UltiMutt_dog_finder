//make sure the page has loaded before starting anything
$(document).ready(function () {

    //create global variables
    var age = [];
    var gender = [];
    var size = [];

    //on load, hide the quiz
    $("#quiz").hide();

    //function that builds url based on filtered search
    function buildQueryURL() {

        var queryURL = "https://petproxy.herokuapp.com/animals?";
        var queryParams = {"type": "dog"};

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
        
        console.log(queryURL + $.param(queryParams));
        return queryURL +"&"+ $.param(queryParams);
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

        //create variables for the results that come in from the quiz


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

        //make api call to get the adoption info from results of the quiz
        var queryURL = buildQueryURL();
        
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response)

        });



        // //make a variable for the url to be used in the api call
        // var adoptURL = "https://petproxy.herokuapp.com/animals?type=dog";

        // //make api call for the breed info
        // $.ajax({
        //     url: adoptURL,
        //     method: "GET",
        // }).then (function(response) {
        //     console.log(response)
        // });

    });


});
