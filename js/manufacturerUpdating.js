$(document).ready(function () {
    $("#updateManufacturerId").val(updatedObject.id);
    $("#updateManufacturerName").val(updatedObject.name);
    $("#updateManufacturerCountry").val(updatedObject.country);
    $("#updateManufacturerFounded").val(updatedObject.founded);
    $("#submitUpdateManufacturerBtn").click(function () {
        var formData = $("#updateManufacturerForm").serializeArray();
        var updatedManufacturer = {}
        for(i = 0; i < 4; i++){
            updatedManufacturer[formData[i].name] = formData[i].value;
        }
        var manufacturerJSON = JSON.stringify(updatedManufacturer);
        var urlOrder = "https://webtechcars.herokuapp.com/api/manufacturers/" + updatedObject.id;
        console.log(urlOrder);
        $.ajax(
            {
                url: urlOrder,
                dataType: "json",
                type: "DELETE"
            }
        );
        $.post({
            url:"https://webtechcars.herokuapp.com/api/manufacturers",
            data: manufacturerJSON,
            dataType: "json",
            success: function (data,status) {
                    alert(status);
                    },
            contentType: "application/json; charset=UTF-8"
        });
    })
})