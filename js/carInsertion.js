$(document).ready(function () {
    console.log("Ready event.");
    addMember("https://webtechcars.herokuapp.com/api/cars", "addCarForm", "cars.html");
});