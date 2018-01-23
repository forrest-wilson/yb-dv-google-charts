google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard(){

    $.ajax({
        url: "data.json",
        dataType: "json",
        success:function(dataFromJSON){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Age');
            data.addColumn('number', 'Income');
            data.addColumn('string', 'Gender');

            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([
                    dataFromJSON[i].first_name + ' ' + dataFromJSON[i].last_name,
                    dataFromJSON[i].age,
                    dataFromJSON[i].annual_income,
                    dataFromJSON[i].gender
                ]);
            };

            var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

            var scatterChart = new google.visualization.ChartWrapper({
                chartType: 'ScatterChart',
                containerId: 'chart1',
                options: {
                    width: '100%',
                    height: '100%',
                    legend: 'none',
                    title: 'Age vs Annual Income',
                    colors: ['white'],
                    backgroundColor: {
                        fill:'transparent'
                    },
                    hAxis:{
                        title: "Age",
                        ticks: [20, 40, 60, 80, 100],
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'white'
                        }
                    },
                    vAxis: {
                        title: "Annual Income",
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                view:{
                    columns: [1, 2]
                }
            });

            var incomeRangeSlider = new google.visualization.ControlWrapper({
                controlType: 'NumberRangeFilter',
                containerId: 'control1',
                options: {
                    filterColumnLabel: 'Income',
                    ui: {
                        labelStacking: "vertical"
                    }
                }
            });

            var genderPicker = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'control2',
                options:{
                    filterColumnLabel: 'Gender',
                    ui: {
                        allowMultiple: false,
                        allowTyping: false,
                        labelStacking: "vertical"
                    }
                }
            });

            dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart]);
            dashboard.draw(data);
            drawPie(dataFromJSON);

            // Binds the slider change to update the Pie chart
            google.visualization.events.addListener(incomeRangeSlider, "statechange", function() {
                // My code. More specific so not as versatile
                // var newData = [];
                // var range = incomeRangeSlider.getState();

                // for (var i = 0; i < dataFromJSON.length; i++) {
                //     if (dataFromJSON[i].annual_income >= range.lowValue && dataFromJSON[i].annual_income <= range.highValue) {
                //         newData.push(dataFromJSON[i]);
                //     }
                // }

                // drawPie(newData);

                // Richards code
                var range = incomeRangeSlider.getState();
                var view = new google.visualization.DataView(data);
                view.setRows(data.getFilteredRows([
                    {
                        column: 2,
                        minValue: range.lowValue,
                        maxValue: range.highValue
                    }
                ]));

                var filteredRows = view.ol;
                var newData = [];

                for (var i = 0; i < filteredRows.length; i++) {
                    newData.push(dataFromJSON[filteredRows[i]]);
                }

                drawPie(newData);

            });
        },
        error:function(errorFromJSON){
            console.log("Something has gone wrong");
            console.log(errorFromJson);
            alert("error!!!!!!!!!");
        }
    })

};

function drawPie(data) {
    var dataGender = new google.visualization.DataTable();
    dataGender.addColumn("string", "Gender");
    dataGender.addColumn("number", "Count");

    var male = 0, female = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i].gender === "Female") {
            female++;
        } else if (data[i].gender === "Male") {
            male++;
        }
    }

    dataGender.addRow(["Male", male]);
    dataGender.addRow(["Female", female]);

    var options = {
        title: "Male and Female Split",
        backgroundColor: {
            fill: "transparent"
        }
    }

    var chart = new google.visualization.PieChart(document.getElementById("chart2"));
    chart.draw(dataGender, options);
}