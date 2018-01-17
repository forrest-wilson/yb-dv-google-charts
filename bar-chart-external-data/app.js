"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "mock-data.json",
        dataType: "json",
        success: function(json) {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("string", "Year");
            dataTable.addColumn("number", "Births");
            dataTable.addColumn("number", "Deaths");
            dataTable.addColumn("number", "Marriages");

            for (var i = 0; i < json.length; i++) {
                dataTable.addRow([json[i].year, json[i].births, json[i].deaths, json[i].marriages]);
            }

            var options = {
                title: "Births, Deaths and Marriages from New Zealand",
                subtitle: "over the last 4 years",
                hAxis: {
                    title: "Number",
                },
                vAxis: {
                    title: "Year"
                },
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: "out"
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById("chartLocation"));
            chart.draw(dataTable, options);
        },
        error: function(e) {
            console.log("Error: " + e.status + "\nMessage: " + e.statusText);
        }
    });
}