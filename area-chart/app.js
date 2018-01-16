"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var data = google.visualization.arrayToDataTable([
        ["Month", "91 Octane", "98 Octane", "Diesel"],
        ["July", 1.879, 1.969, 1.199],
        ["August", 2.019, 2.109, 1.319],
        ["September", 2.049, 2.139, 1.349],
        ["October", 2.069, 2.159, 1.409],
        ["November", 2.149, 2.239, 1.489],
        ["December", 2.109, 2.199, 1.449],
    ]);

    var options = {
        title: "Fuel Prices July - December 2017",
        hAxis: {
            title: "Year"
        },
        vAxis: {
            title: "$/Litre",
            minValue: 0
        },
        animation: {
            startup: true,
            duration: 1000,
            easing: "in"
        },
        areaOpacity: 0.1,
        crosshair: {
            color: "grey",
            trigger: "both"
        }
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.AreaChart(document.getElementById("chartLocation"));
    chart.draw(data, options);
}