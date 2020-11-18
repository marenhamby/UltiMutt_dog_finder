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
        var age = ""
        var gender = ""
        var size = ""

        if ($(".small").is(":checked")) {
            size = "small"
        }
        if ($(".medium").is(":checked")) {
            size = "medium"
        }
        if ($(".large").is(":checked")) {
            size = "large"
        }
        if ($(".X-large").is(":checked")) {
            size = "x-large"
        }

    })


    //make api call for the breed info






})