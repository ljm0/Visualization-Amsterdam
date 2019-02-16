var width = 1000;
var height = 800;
// creat svg
var svgContainer = d3.select("body")
                     .append("svg")
                     .attr("width", width)
                     .attr("height", height);

var chart_height =400;
var chart_width =700;

// x and y scale
var x = d3.scaleBand().rangeRound([0,chart_width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([chart_height,0]);


var chart_group = svgContainer.append("g")
                              .attr("id", "chart_group")
                              .attr("transform", "translate(" + 200 + "," + 50 + ")");

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
        // console.log(data);
        var mymonth = [];
        for (var i = 0; i < data.length; i++) {
            mymonth.push(data[i].mymonth);
        };

        x.domain(mymonth);
        chart_group.append("g")
            .attr("transform", "translate(" + 0 + "," + chart_height + ")")
            .call(d3.axisBottom(x));

        var maxValue = d3.max(data, function (d) {
            // return Math.max(d["2011"], d["2012"], d["2013"], d["2014"], d["2015"]);
            return Math.max(d["2011"]);
        });

        yaxis = d3.axisLeft(y);
        y.domain([0, maxValue]);

        chart_group.append("g")
                   .attr("class", "axisy").call(yaxis);
        // chart_group.selectAll("axisy").call(yaxis);

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


        chart_group.selectAll(".bartext")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bartext")
            .attr("x", function (d) {
                return x(d.mymonth);
            })
            .attr("y", function (d) {
                return y(d["2011"]);
            })
		    .attr("dx", function (d) {
                // return ((x(d.mymonth)) / 2);
                return 20;
		    })
		    .attr("dy", function (d) {
		        return -15;
		    }).text(function (d) {
		        return d['2011'];
		    });

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
                    chart_group.selectAll(".bartext")
                            .attr("y", function (d) {
                                return y(d[String(year)]);
                            })
                        .text(function (d) {
                            return d[String(year)];
                        });
                    
                    var maxValue = d3.max(data, function (d) {
                        return Math.max(d[String(year)]);
                    });
                    y.domain([0, maxValue]);
                    // chart_group.select("axis-y").remove();
                    chart_group.selectAll("axis-y")
                                // .append("g")
                                // .select("axis-y")
                                .call(d3.axisLeft(y));
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
                chart_group.selectAll(".bartext")
                            .attr("y", function (d) {
                                return y(d[String(year)]);
                            })
                        .text(function (d) {
                            return d[String(year)];
                        });

            });


    });
