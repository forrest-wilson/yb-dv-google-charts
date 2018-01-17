"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "data.json",
        dataType: "json",
        success: function(json) {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("string", "App Name");
            dataTable.addColumn("number", "Critic Rating");
            dataTable.addColumn("number", "User Rating");

            for (var i = 0; i < json.length; i++) {
                dataTable.addRow([json[i].appName, json[i].criticRating, json[i].userRating]);
            }

            var options = {
                title : "User and Critic App Ratings",
                vAxis: {
                    title: "Rating",
                    ticks: [0, 2, 4, 6, 8, 10]
                },
                hAxis: {
                    title: "App"
                },
                legend: "none",
                isStacked: true
            };

            var chart = new google.visualization.SteppedAreaChart(document.getElementById("chartLocation"));
            chart.draw(dataTable, options);
        },
        error: function(e) {
            console.log("Error: " + e.status + "\nMessage: " + e.statusText);
        }
    });
}