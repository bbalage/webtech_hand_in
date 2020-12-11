$(document).ready(function (){
    $("#contentSection").load("indexContent.html");

    $("#indexLink").click(function (event){
        event.preventDefault();
        $("#contentSection").load("indexContent.html");
    })

    $("#carsLink").click(function (event){
        event.preventDefault();
        $("#contentSection").load("cars.html");
    })
})