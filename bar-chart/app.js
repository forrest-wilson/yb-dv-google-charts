"use strict";

var statData = [
    {
        year: "2013",
        births: 58719,
        deaths: 29568,
        marriages: 19237
    },
    {
        year: "2014",
        births: 57243,
        deaths: 31062,
        marriages: 20125
    },
    {
        year: "2015",
        births: 61038,
        deaths: 31608,
        marriages: 19947
    },
    {
        year: "2016",
        births: 59430,
        deaths: 31179,
        marriages: 20235
    },
    {
        year: "2017",
        births: 50000,
        deaths: 40000,
        marriages: 20000
    }
];

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    // var data = google.visualization.arrayToDataTable([
    //     ["Year", "Births", "Deaths", "Marrage"],
    //     ["2013", 58719, 29568, 19237],
    //     ["2014", 57243, 31062, 20125],
    //     ["2015", 61038, 31608, 19947],
    //     ["2016", 59430, 31179, 20235]
    // ]);

    var data = new google.visualization.DataTable();
    data.addColumn("string", "Year");
    data.addColumn("number", "Births");
    data.addColumn("number", "Deaths");
    data.addColumn("number", "Marriages");

    for (var i = 0; i < statData.length; i++) {
        data.addRow([statData[i].year, statData[i].births, statData[i].deaths, statData[i].marriages]);
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

    // Instantiate and draw the chart.
    var chart = new google.visualization.BarChart(document.getElementById("chartLocation"));
    chart.draw(data, options);
}