Template.arfcns.helpers({
  count: function() {
    return ARFCNs.ARFCNs.find().count()
  },
  used: function() {
    return ARFCNs.ARFCNs.find({currentlyBroadcasting: true}).count()
  }
  });

/*  Template.charts.onRendered(function() {
      // Get the context of the canvas element we want to select
      var ctx  = document.getElementById("myChart").getContext("2d");
    //  var ctx2 = document.getElementById("myChart2").getContext("2d");
        //  var ctx2  = document.getElementById("myBarChart").getContext("2d");

      // Set the options
      var options = {

          ///Boolean - Whether grid lines are shown across the chart
          scaleShowGridLines: true,

          //String - Colour of the grid lines
          scaleGridLineColor: "rgba(0,0,0,.05)",

          //Number - Width of the grid lines
          scaleGridLineWidth: 2,

          //Boolean - Whether to show horizontal lines (except X axis)
          scaleShowHorizontalLines: true,

          //Boolean - Whether to show vertical lines (except Y axis)
          scaleShowVerticalLines: true,

          //Boolean - Whether the line is curved between points
          bezierCurve: true,

          //Number - Tension of the bezier curve between points
          bezierCurveTension: 0.1,

          //Boolean - Whether to show a dot for each point
          pointDot: true,

          //Number - Radius of each point dot in pixels
          pointDotRadius: 1,

          //Number - Pixel width of point dot stroke
          pointDotStrokeWidth: 1,

          //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
          pointHitDetectionRadius: 20,

          //Boolean - Whether to show a stroke for datasets
          datasetStroke: true,

          //Number - Pixel width of dataset stroke
          datasetStrokeWidth: 2,

          //Boolean - Whether to fill the dataset with a colour
          datasetFill: true,

          //String - A legend template
          legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

      };

    var options2 = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,

      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,

      //Boolean - If there is a stroke on each bar
      barShowStroke : true,

      //Number - Pixel width of the bar stroke
      barStrokeWidth : 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing : 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing : 1,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    }


      // Set the data
      var data = {
          labels: ["2","5","4"],
          datasets: [{
              label: "",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [random(), random(), random(), random(), random(), random(), random()]
          /* },

          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [random(), random(), random(), random(), random(), random(), random()]
          */

/*

  }]
   };

      var data2 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
        ]
      };

      // draw the charts
      //myLineChart.data.labels = ["1","2","3"];
     //var myLineChart = new Chart(ctx).Line(data, options);
          var myLineChart = new Chart(ctx).Line(data, options);
      //    var myBarChart = new Chart(ctx2).Line(data2, options2);

  });

  function random() {
      return Math.floor((Math.random() * 100) + 1);
  }
*/
