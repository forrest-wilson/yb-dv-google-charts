"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var data = google.visualization.arrayToDataTable([
        ["ID", "Average Min Temp", "Average Max Temp", "Area", "Population"],
        ["AKL", 11, 18, "Auckland", 1377000],
        ["WGN", 10, 16, "Wellington", 203800],
        ["CHC", 6, 16, "Christchurch", 367800],
        ["DUD", 4, 15, "Dunedin", 125800],
    ]);

    var options = {
        title: "Correlation between temperature and population of centeres in NZ",
        hAxis: {
            title: "Min Temperature"
        },
        vAxis: {
            title: "Max Temperature",
            baseline: 14
        },
        bubble: {
            textStyle: {
                fontSize: 11
            }
        }
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.BubbleChart(document.getElementById("chartLocation"));
    chart.draw(data, options);
}