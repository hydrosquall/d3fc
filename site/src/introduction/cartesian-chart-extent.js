// a random number generator
var generator = fc.randomGeometricBrownianMotion()
    .steps(11);

// some formatters
var dateFormatter = d3.timeFormat('%b');

// randomly generated sales data starting at one
var data = generator(1).map(function(d, i) {
  return {
    month: dateFormatter(new Date(0, i + 1, 0)),
    sales: d + i / 2
  };
});

// START
var yExtent = fc.extentLinear()
    .include([0])
    .pad([0, 0.5])
    .accessors([function(d) { return d.sales; }]);

var chart = fc.chartSvgCartesian(
        d3.scalePoint(),
        d3.scaleLinear())
    .xDomain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
    .xPadding(0.5)
    .yDomain(yExtent(data));
// END

var series = fc.seriesSvgBar()
    .crossValue(function(d) { return d.month; })
    .mainValue(function(d) { return d.sales; });

chart.plotArea(series);

d3.select('#cartesian-extent')
    .datum(data)
    .call(chart);
