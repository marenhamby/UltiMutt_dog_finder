//make sure the page has loaded before starting anything
$(document).ready(function () {

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

 //hide the section that shows the breed results
 $("#breedSection").hide();

 // create on-click function to take in input value of search and display dog breed info
 $("#chooseBtn").on("click", function (event) {
     event.preventDefault();
     
     //show the section that displays the breed results
     $("#breedSection").show();
     
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

             $("#breed-image").attr("src", (response[0].url))
             .width('500px')

         });

     });

 });


})