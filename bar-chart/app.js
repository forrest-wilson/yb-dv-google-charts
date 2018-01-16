"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var data = google.visualization.arrayToDataTable([
        ["Year", "Births", "Deaths", "Marrage"],
        ["2013", 58719, 29568, 19237],
        ["2014", 57243, 31062, 20125],
        ["2015", 61038, 31608, 19947],
        ["2016", 59430, 31179, 20235]
    ]);

    var options = {
        title: "Births, Deaths and Marrages from New Zealand",
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

    // Instantiate and draw the chart.
    var chart = new google.visualization.BarChart(document.getElementById("barChartLocation"));
    chart.draw(data, options);
}