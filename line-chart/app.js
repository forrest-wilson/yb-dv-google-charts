"use strict";

google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    $.ajax({
        url: "data.json",
        dataType: "json",
        success: function(json) {
            var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn("string", "Temperatures");
            dataTable.addColumn("number", "Minimum Temperature");
            dataTable.addColumn("number", "Maximum Temperature");

            for (var i = 0; i < json.length; i++) {
                dataTable.addRow([days[i], json[i].min, json[i].max]);
            }

            var options = {
                title : "User and Critic App Ratings",
                vAxis: {
                    title: "Temperature (Degrees Celcius)"
                },
                hAxis: {
                    title: "Day of the Week"
                },
                legend: "none"
            };

            var chart = new google.visualization.LineChart(document.getElementById("chartLocation"));
            google.visualization.events.addListener(chart, "select", clickEvent);
            chart.draw(dataTable, options);

            function clickEvent() {
                var tableRow = chart.getSelection()[0].row;
                var moreInfo = json[tableRow];

                if (moreInfo) {
                    console.log(moreInfo);
                    document.getElementById("avatarImage").src = moreInfo.avatar;
                    document.getElementById("minTemp").textContent = "Min Temp: " + moreInfo.min + " C";
                    document.getElementById("maxTemp").textContent = "Max Temp: " + moreInfo.max + " C";
                    document.getElementById("infoBox").style.backgroundColor = moreInfo.color;
                }
            }
        },
        error: function(e) {
            console.log("Error: " + e.status + "\nMessage: " + e.statusText);
        }
    });
}