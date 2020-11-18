//make sure the page has loaded before starting anything
$(document).ready(function() {

    //on load, hide the quiz
    $("#quiz").hide();

    //create global variables

    // create on-click function to open the quiz
    $("#startQuiz").on("click", function(event) {
        event.preventDefault();

        //show quiz content and hide the button to start the quiz
        $("#quiz").show();
        $("#startQuiz").hide();
    });

    //create on-click function for the submit button for the quiz, and hide the quiz to display results info
    $("#submitQuiz").on("click", function(event) {
        event.preventDefault();

        //hide the quiz content
        $("#quiz").hide();

        //make api call to get the adoption info from results of the quiz

        //create variables for the results that come in from the quiz
        var age = []
        var gender = []
        var size = []

        //create if statements to change the value of age depending on which age is checked
        if ($(".baby").is(":checked")) {
            age.push("baby")
        }
        if ($(".young").is(":checked")) {
            age.push("young")
        }
        if ($(".adult").is(":checked")) {
            age.push("adult")
        }
        if ($(".senior").is(":checked")) {
            age.push("senior")
        }
        console.log(age)

        //create if statements to change the value of gender depending on which gender is checked
        if ($(".male").is(":checked")) {
            gender.push("male")
        }
        if ($(".female").is(":checked")) {
            gender.push("female")
        }
        if ($(".either").is(":checked")) {
            gender.push("male")
            gender.push("female")
        }
        console.log(gender)

        //create if statements to change the value of size depending on which size is checked
        if ($(".small").is(":checked")) {
            size.push("small")
        }
        if ($(".medium").is(":checked")) {
            size.push("medium")
        }
        if ($(".large").is(":checked")) {
            size.push("large")
        }
        if ($(".X-large").is(":checked")) {
            size.push("x-large")
        }
        console.log(size)

        
    })


    //make api call for the breed info






})