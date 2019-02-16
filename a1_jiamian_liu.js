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

// //画布周边的空白
// var padding = {
//     left: 30,
//     right: 30,
//     top: 20,
//     bottom: 20
// };

// x and y scale
var x = d3.scaleBand().rangeRound([0,chart_width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([chart_height,0]);

// //x轴的比例尺
// var xScale = d3.scale.ordinal()
//     .domain(d3.range(dataset.length))
//     .rangeRoundBands([0, width - padding.left - padding.right]);
// //y轴的比例尺
// var yScale = d3.scale.linear()
//     .domain([0, d3.max(dataset)])
//     .range([height - padding.top - padding.bottom, 0]);
// //定义x轴
// var xAxis = d3.svg.axis()
//     .scale(xScale)
//     .orient("bottom");
// //定义y轴
// var yAxis = d3.svg.axis()
//     .scale(yScale)
//     .orient("left");

//x y axis 
//FIXME different
var chart_group = svgContainer.append("g")
                              .attr("id", "chart_group")
                              .attr("transform", "translate(" + 10 + "," + 50 + ")");

d3.csv("newmeteo.csv", function (d) {
        return {
            "mymonth": d.mymonth,
            "2011": +d["2011"],
            "2012": +d["2012"],
            "2013": +d["2013"],
            "2014": +d["2014"],
            "2015": +d["2015"]
        }
    })
    .then(function (data) {
        var stadsdelen = [];
        for (var i = 0; i < data.length; i++) {
            stadsdelen.push(data[i].mymonth);
        };

        x.domain(stadsdelen);

        chart_group.append("g")
            .attr("transform", "translate(" + 0 + "," + chart_height + ")")
            .call(d3.axisBottom(x));

        var maxValue = d3.max(data, function (d) {
            return Math.max(d["2011"], d["2012"], d["2013"], d["2014"], d["2015"]);
        });

        y.domain([0, maxValue]);

        chart_group.append("g")
            .call(d3.axisLeft(y));


        chart_group.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.mymonth);
            })
            .attr("y", function (d) {
                return y(d["2011"]);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                return chart_height - y(d["2011"]);
            });

        var year = 2011;

        chart_group.append("text")
            .attr("class", "title")
            .attr("y", -25)
            .attr("x", chart_width / 2)
            .style("text-anchor", "middle")
            .text("average monthly temperatures of " + String(year));


        d3.select("#up")
            .on("click", function (d) {
                if (year !== 2015) {
                    year = year + 1;
                    chart_group.selectAll(".bar")
                        .transition()
                        .attr("y", function (d) {
                            return y(d[String(year)])
                        })
                        .attr("height", function (d) {
                            return chart_height - y(d[String(year)]);
                        });

                    chart_group.select(".title")
                        .text("average monthly temperatures of " + String(year));
                }
            });

        d3.select("#down")
            .on("click", function (d) {
                if (year !== 2011) {
                    year = year - 1;
                    chart_group.selectAll(".bar")
                        .transition()
                        .attr("x", function (d) {
                            return x(d.mymonth)
                        })
                        .attr("y", function (d) {
                            return y(d[String(year)]);
                        })
                        .attr("height", function (d) {
                            return chart_height - y(d[String(year)]);
                        });
                };

                chart_group.select(".title")
                    .text(" average monthly temperatures of " + String(year));
            });


    });
