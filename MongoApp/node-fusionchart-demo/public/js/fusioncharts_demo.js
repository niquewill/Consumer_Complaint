var chartData;

$(function(){
  $.ajax({

    url: 'http://localhost:3300/loggedComplaints',
    type: 'GET',
    success : function(data) {
      chartData = data;
      var template = Handlebars.compile($("#tabular-template").html());
      $("#table-location").html(template(data));

      var chartProperties = {
        "caption": "Variation of Logged and Resolved Complaints in Bank of America",
        "numberprefix": "Rs",
        "xAxisName": "Month",
        "yAxisName": "# of Complaints"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-location',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();
    }
  });
});
