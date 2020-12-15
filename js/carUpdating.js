$(document).ready(function () {
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data){
        const manufacturerList = $("#selectManufacturersUpdate");
        $.each(data, function(key, value){
            const nameOption = $("<option>"+value.name+"</option>");
            nameOption.val(value.name);
            manufacturerList.append(nameOption);
        });
        $(manufacturerList).val(updatedObject.manufacturer);
    })
    updateObject("https://webtechcars.herokuapp.com/api/cars", "updateCarForm", "cars.html");
})