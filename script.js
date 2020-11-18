var url = "https://petproxy.herokuapp.com/animals?type=dog";

$.ajax({
    url: url,
    method: "GET",
})
    .then(function (response) {
    console.log(response);
    })