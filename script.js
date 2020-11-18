//make sure the page has loaded before starting anything
$(document).ready(function() {

    //on load, hide the quiz
    $("#quiz").hide();

    //create global variables for the results that come in from the quiz
    var age = [];
    var gender = [];
    var size = [];

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
        
        //make a variable for the url to be used in the api call
        var adoptURL = "https://petproxy.herokuapp.com/animals";
        
        //make api call to get the adoption info from results of the quiz
        $.ajax({
            url: adoptURL,
            method: "GET",
        }).then (function(response) {
            console.log(response)
            
        });
        
        //add var from results from api call
        var dogNameResult = response.animals[i].name
        var dogTypeResult = response.animals[i].breeds.primary
        var ageResult = response.animals[i].age
        var genderResult = response.animals[i].gender
        var sizeResult = response.animals[i].size
        var pictureResult = response.animals[i].photos[0].medium
        var cityStateResult = response.animals[i].contact.address.city + ", " + response.animals[i].contact.address.state
        var linkResult = response.animals[i].url
        //add looped tiles for results from the api call 
        

        //add adoption center name
        //add city and state of adoption center
        //add link to center
        //add dog info
        //add save button
        
        
        
        
        
        
        
        
        
        //make api call for the breed info
    })
    
    
    
    
    
    
    

})