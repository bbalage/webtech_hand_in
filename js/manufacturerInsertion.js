$(document).ready(function () {
    $("#submitAddManufacturerBtn").click(function (){
        var formData = $("#addManufacturerForm").serializeArray();
        var manufacturer = {
            id: null,
            name: "",
            country: "",
            founded: ""
        }
        for(i = 0; i < 4; i++){
            var formDatum = formData[i];
            manufacturer[formDatum.name] = formDatum.value;
        }
        var manufacturerJSON = JSON.stringify(manufacturer);
        console.log(manufacturerJSON);
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
    /*$("#submitAddManufacturerBtn").click(function (){
        var formData = $("#addManufacturerForm").serializeArray();
        console.log(formData);
    })*/
})