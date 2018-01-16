"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.load("current", {
    "packages": ["geochart"],
    "mapsApiKey": "AIzaSyBTakZ_NieFqZ81qaAI6N3d2ccM4EwhcdI"
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ["Country", "Population Density People/km2"],
        ["China", 144],
        // ["BD", 1138],
        ["Russia", 9],
        ["US", 33],
        ["Brazil", 24]
    ]);

    var options = {
        colorAxis: {
            colors: ["lightblue", "lightgreen"]
        }
    };

    // Instantiate and draw the chart.
    var chart = new google.visualization.GeoChart(document.getElementById("chartLocation"));
    chart.draw(data, options);
}