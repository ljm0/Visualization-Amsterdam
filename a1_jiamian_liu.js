// var p = d3.select("body")
//     .selectAll("p")
//     .text("hello");

// p.style("color", "red")
//     .style("font-size", "72px");

var width = 1000;
var height = 500;
// creat svg
var svgContainer = d3.select("body")
                     .append("svg")
                     .attr("width", width)
                     .attr("height", height);

var chart_height =400;
var chart_width =700;

//画布周边的空白
var padding = {
    left: 30,
    right: 30,
    top: 20,
    bottom: 20
};

// x and y scale
var x = d3.scaleBand().rangeRound([0,chart_width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([chart_height,0]);

//x y axis 
//FIXME different
var chart_group = svgContainer.append("g")
                              .attr("id","chart_group")
                              .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")");

d3.csv("newmeteo.csv", function(d) {
    return {
        "year": +d.year,
        "month": +d.month,
        "temperature": +d.temperature
    }
})
.then(function (data) {
    console.log(data);
});
