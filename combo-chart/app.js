"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "data.json",
        dataType: "json",
        success: function(json) {
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("string", "Date");
            dataTable.addColumn("number", "NZ Temp");
            dataTable.addColumn("number", "AUS Temp");
            dataTable.addColumn("number", "USA Temp");
            dataTable.addColumn("number", "UK Temp");
            dataTable.addColumn("number", "Average");

            for (var i = 0; i < json.length; i++) {
                var avg = (json[i].nzTemp + json[i].ausTemp + json[i].usTemp + json[i].ukTemp) / 4;
                dataTable.addRow([json[i].date, json[i].nzTemp, json[i].ausTemp, json[i].usTemp, json[i].ukTemp, avg]);
            }

            var options = {
                title : "Average Temp for the last 5 days",
                vAxis: {
                    title: "Temperature"
                },
                hAxis: {
                    title: "Date"
                },
                seriesType: "bars",
                series: {
                    4: {
                        type: "line"
                    }
                }
            };

            var chart = new google.visualization.ComboChart(document.getElementById("chartLocation"));
            chart.draw(dataTable, options);
        },
        error: function(e) {
            console.log("Error: " + e.status + "\nMessage: " + e.statusText);
        }
    });
}