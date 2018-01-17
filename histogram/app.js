"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "data.json",
        dataType: "json",
        success: function(json) {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("string", "Car");
            dataTable.addColumn("number", "Top Speed");

            for (var i = 0; i < json.length; i++) {
                dataTable.addRow([json[i].car, json[i].topSpeed]);
            }

            var options = {
                title: "Top Speeds of Vehicles",
                hAxis: {
                    title: "Speed (km/hr)"
                },
                vAxis: {
                    title: "Number"
                },
                dataOpacity: 0.8
            };

            var chart = new google.visualization.Histogram(document.getElementById("chartLocation"));
            chart.draw(dataTable, options);
        },
        error: function(e) {
            console.log("Error: " + e.status + "\nMessage: " + e.statusText);
        }
    });
}