$(document).ready(function (){
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data){
        var tableBody = $("#manufacturerListTable").find("tbody")[0];
        $.each(data, function(key, value){
            const row = $("<tr></tr>");
            const rowId = value._id;
            $(row).attr("id", rowId);
            const nameCell = $("<td>"+value.name+"</td>");
            const countryCell = $("<td>"+value.country+"</td>");
            const foundedCell = $("<td>"+value.founded+"</td>");
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);
            /*Cell for update button.*/
            const updateCell = $("<td></td>");
            const updateButton = $("<button>Update</button>");
            //$(updateButton).attr("id",value._id+"UpdateButton");
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
            });
            $(updateCell).append(updateButton);
            $(row).append(updateCell);
            $(tableBody).append(row);
            /*Adding delete button*/
            const deleteCell = $("<td></td>");
            const deleteButton = $("<button>Delete</button>");
            //$(deleteButton).attr("id",value._id+"DeleteButton");
            $(deleteButton).attr("class", "deleteButton");
            $(deleteButton).click(function (event) {
                event.preventDefault();
                const urlOrder = "https://webtechcars.herokuapp.com/api/manufacturers/" + value._id;
                console.log(urlOrder);
                $.ajax(
                    {
                        url: urlOrder,
                        dataType: "json",
                        type: "DELETE"
                    }
                );
                $("#"+rowId).remove();
                //$("#contentSection").load("manufacturers.html"); //Load happens faster, than deletion in database.
            });
            $(deleteCell).append(deleteButton);
            $(row).append(deleteCell);
            $(tableBody).append(row);
        })
    });
})