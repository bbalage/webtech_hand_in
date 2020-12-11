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

    $("#manufacturersLink").click(function (event){
        event.preventDefault();
        $("#contentSection").load("manufacturers.html");
    })

    $("#addManufacturerLink").click(function (event){
        event.preventDefault();
        $("#contentSection").load("addManufacturer.html");
    })

    $("#addCarLink").click(function (event){
        event.preventDefault();
        $("#contentSection").load("addCar.html");
        $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data){
            var manufacturerList = $("#selectManufacturers");
            $.each(data, function(key, value){
                var nameOption = $("<option>"+value.name+"</option>");
                manufacturerList.append(nameOption);
            })
        })
    })
})