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

function loadToTable(url, tableId, updatePage){
    $.getJSON(url, function (data){
        var tableBody = $("#"+tableId).find("tbody")[0];
        $.each(data, function(key, value){
            const propertyNames = Object.getOwnPropertyNames(value);
            const row = $("<tr></tr>");
            const rowId = value._id;
            $(row).attr("id", rowId);
            for(let i = 1; i < propertyNames.length; i++){
                let generalCell = $("<td>"+value[propertyNames[i]]+"</td>");
                row.append(generalCell);
            }
            /*Cell for update button.*/
            const updateCell = $("<td></td>");
            const updateButton = $("<button>Update</button>");
            //$(updateButton).attr("id",value._id+"UpdateButton");
            $(updateButton).attr("class", "updateButton");
            $(updateButton).click(function (event) {
                event.preventDefault();
                updatedObject = {
                    "id": value._id
                };
                for(let i = 1; i < propertyNames.length; i++){
                    updatedObject[propertyNames[i]] = value[propertyNames[i]];
                }
                $("#contentSection").load(updatePage);
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
                const urlOrder = url + "/" + value._id;
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
}

function addMember(url, formId, returnPage){
    const generalForm = $("#"+formId);
    const submitBtn = $(generalForm).find("button.submitBtn")[0];
    $(submitBtn).click(function (){
        const formData = $(generalForm).serializeArray();
        const objectToInsert = {};
        console.log(Object.getOwnPropertyNames(formData));
        for(let i = 0; i < formData.length; i++){
            const formDatum = formData[i];
            objectToInsert[formDatum.name] = formDatum.value;
        }
        const jsonToInsert = JSON.stringify(objectToInsert);
        console.log(jsonToInsert);
        $.post({
            url: url,
            data: jsonToInsert,
            dataType: "json",
            success: function (data,status) {
                alert(status);
            },
            contentType: "application/json; charset=UTF-8"
        });
        alert("Request processed.");
        $("#contentSection").load(returnPage);
    })
}