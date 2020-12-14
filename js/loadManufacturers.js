$(document).ready(function (){
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data){
        var tableBody = $("#manufacturerListTable").find("tbody")[0];
        $.each(data, function(key, value){
            var row = $("<tr></tr>");
            var nameCell = $("<td>"+value.name+"</td>");
            var countryCell = $("<td>"+value.country+"</td>");
            var foundedCell = $("<td>"+value.founded+"</td>");
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);
            /*Cell for update button.*/
            var formUpdateCell = $("<td></td>");
            var updateButton = $("<button>Update</button>");
            $(updateButton).attr("id",value._id+"Button");
            $(updateButton).attr("class", "updateButton");
            $(updateButton).click(function (event) {
                event.preventDefault();
                $("#contentSection").load("updateManufacturer.html");
                updatedObject = {
                    "id": value._id,
                    "name": value.name,
                    "country": value.country,
                    "founded": value.founded
                };
            })
            $(formUpdateCell).append(updateButton);
            $(row).append(formUpdateCell);
            $(tableBody).append(row);
        })
    });
    /*$(".updateButton").each(function () {
        $(this).click(function (event) {

        })
    })*/
})