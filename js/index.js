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
            const manufacturerList = $("#selectManufacturers");
            $.each(data, function(key, value){
                const nameOption = $("<option>"+value.name+"</option>");
                manufacturerList.append(nameOption);
            })
        })
    })
})

function loadToTable(url, tableId, updatePage){
    $.getJSON(url, function (data){
        const tableBody = $("#"+tableId).find("tbody")[0];
        $.each(data, function(key, value){
            const propertyNames = Object.getOwnPropertyNames(value);
            const row = $("<tr></tr>");
            const rowId = value._id;
            $(row).attr("id", rowId);
            $(row).attr("class","dataTableRow");
            for(let i = 1; i < propertyNames.length; i++){
                let generalCell = $("<td>"+value[propertyNames[i]]+"</td>");
                $(generalCell).attr("class", "dataTableCell");
                row.append(generalCell);
            }
            /*Cell for update button.*/
            const updateCell = $("<td></td>");
            $(updateCell).attr("class", "dataTableCell");
            const updateButton = $("<button>Update</button>");
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
            $(deleteCell).attr("class", "dataTableCell");
            const deleteButton = $("<button>Delete</button>");
            $(deleteButton).attr("class", "deleteButton");
            $(deleteButton).click(function (event) {
                event.preventDefault();
                const urlOrder = url + "/" + value._id;
                $.ajax(
                    {
                        url: urlOrder,
                        dataType: "json",
                        type: "DELETE",
                        /*headers:{
                            'Access-Control-Allow-Origin':'*',
                        }*/
                    }
                );
                /*So the speed of the delete request in the database would not affect
                * whether the row disappears or not.*/
                $("#"+rowId).remove();
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
        for(let i = 0; i < formData.length; i++){
            const formDatum = formData[i];
            objectToInsert[formDatum.name] = formDatum.value;
        }
        const jsonToInsert = JSON.stringify(objectToInsert);
        $.post({
            url: url,
            data: jsonToInsert,
            dataType: "json",
            contentType: "application/json; charset=UTF-8"
            /*headers:{
                'Access-Control-Allow-Origin':'*',
            }*/
        });
        alert("Request processed.");
        $("#contentSection").load(returnPage);
    })
}

function updateObject(url, formId, returnPage){
    const updateForm = $("#"+formId);
    const propertyNames = Object.getOwnPropertyNames(updatedObject);
    for(let i = 0; i < propertyNames.length; i++){
        const formControl = $(updateForm).find("[name = "+propertyNames[i]+"]")[0];
        $(formControl).val(updatedObject[propertyNames[i]]);
    }
    const submitBtn = $(updateForm).find("button.submitBtn")[0];
    $(submitBtn).click(function () {
        const formData = $(updateForm).serializeArray();
        const updatedObject = {}
        for(let i = 0; i < formData.length; i++){
            updatedObject[formData[i].name] = formData[i].value;
        }
        const updatedObjectJSON = JSON.stringify(updatedObject);
        const urlOrder = url + "/" + updatedObject.id;
        $.ajax(
            {
                url: urlOrder,
                dataType: "json",
                type: "DELETE"
            }
        );
        $.post({
            url: url,
            data: updatedObjectJSON,
            dataType: "json",
            contentType: "application/json; charset=UTF-8"
        });
        alert("Request processed.");
        $("#contentSection").load(returnPage);
    })
}