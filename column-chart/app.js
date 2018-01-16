"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var chartDiv = document.getElementById("chartLocation");

    var data = google.visualization.arrayToDataTable([
        ["Year", "Income", "Expense", "Saving"],
        ["2014", 36000, 30000, 6000],
        ["2015", 38000, 30000, 8000],
        ["2016", 40000, 29000, 11000],
        ["2017", 45000, 33000, 12000],
    ]);

    var options = {
        vAxis: {
            minValue: 0,
            ticks: [0, 10000, 20000, 30000, 40000, 50000]
        },
        colors: ["lightgreen", "red", "gold"]
    };

    var chart = new google.visualization.ColumnChart(chartDiv);
    chart.draw(data, options);
}