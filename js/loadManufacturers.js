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
            $(tableBody).append(row);
        })
    })
})