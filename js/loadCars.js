$(document).ready(function (){
    $.getJSON("https://webtechcars.herokuapp.com/api/cars", function (data){
        var tableBody = $("#carListTable").find("tbody")[0];
        $.each(data, function(key, value){
            var row = $("<tr></tr>");
            var nameCell = $("<td>"+value.name+"</td>");
            var consumptionCell = $("<td>"+value.consumption+"</td>");
            var colorCell = $("<td>"+value.color+"</td>");
            var manufacturerCell = $("<td>"+value.manufacturer+"</td>");
            var availableCell = $("<td>"+value.avaiable+"</td>");
            var yearCell = $("<td>"+value.year+"</td>");
            var horsepowerCell = $("<td>"+value.horsepower+"</td>");
            $(row).append(nameCell);
            $(row).append(consumptionCell);
            $(row).append(colorCell);
            $(row).append(manufacturerCell);
            $(row).append(availableCell);
            $(row).append(yearCell);
            $(row).append(horsepowerCell);
            $(tableBody).append(row);
        })
    })
})