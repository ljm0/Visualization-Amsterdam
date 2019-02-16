
document.getElementById("mytext").innerHTML = "I'm also learning javascript";

d3.select("#mytext").text("I'm now learning D3");


var width = 1000;
var height = 500;

var svgContainer = d3.select("body").append("svg")
						.attr("height", height)
						.attr("width", width);


// var circle = svgContainer.append("circle")
// 						.attr("cx", 30)
// 						.attr("cy", 30)
// 						.attr("r", 20);

//  var rectangle = svgContainer.append("rect")
// 							.attr("x", 10)
// 							.attr("y", 10)
// 							.attr("width", 50)
// 							.attr("height", 100);


// var ellipse = svgContainer.append("ellipse")
// 							.attr("cx", 50)
// 							.attr("cy", 50)
// 							.attr("rx", 25)
// 							.attr("ry", 10)
// 							.attr("fill", "red")
// 							.attr("id", "ellipse");

// d3.select("#ellipse").attr("fill","green");


// var line = svgContainer.append("line")
//                          .attr("x1", 5)
//                          .attr("y1", 5)
//                          .attr("x2", 50)
//                          .attr("y2", 50)
//                          .attr("stroke-width", 2)
//                          .attr("stroke", "blue");

// var arc = d3.arc()
//     .innerRadius(40)
//     .outerRadius(100)
//     .startAngle(0)
//     .endAngle(3);

// svgContainer.append("path")
// 	.attr("transform", "translate(" + 100 + "," + 100 + ")")
//     .attr("d", arc)
//     .attr("fill", "red")
//     .attr("class", "arc")
//     .on("click", function(d) {
//     	d3.select(".arc").attr("fill","blue");
//     });

// d3.csv("d3_tutorial_pop_ams.csv")
// 	.then(function(data) {
// 		data.forEach(function (d) {
// 		d["2014"] = +d["2014"];
// 		d["2015"] = +d["2015"];
// 		d["2016"] = +d["2016"];
// 		d["2017"] = +d["2017"];
// 		d["2018"] = +d["2018"];
// 	})
// 		ams_data = data;
// 	})


var chart_height = 400,
	chart_width = 700;


var x = d3.scaleBand().rangeRound([0, chart_width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([chart_height, 0]);


var chart_group = svgContainer.append("g")
	.attr("id", "chart_group")
    .attr("transform", "translate(" + 100 + "," + 50 + ")");


d3.csv("d3_tutorial_pop_ams.csv", function(d) {
	return {
		"stadsdeel" : d.stadsdeel,
		"2014" : +d["2014"],
		"2015" : +d["2015"],
		"2016" : +d["2016"],
		"2017" : +d["2017"],
		"2018" : +d["2018"]
	}
})
	.then(function(data) {
		var stadsdelen = [];
		for (var i=0; i < data.length; i++) {
			stadsdelen.push(data[i].stadsdeel);
		};

		x.domain(stadsdelen);

		chart_group.append("g")
			.attr("transform", "translate(" + 0 + "," + chart_height + ")")
			.call(d3.axisBottom(x));

		var maxValue = d3.max(data, function(d) {
			return Math.max(d["2014"], d["2015"], d["2016"], d["2017"], d["2018"]);
		});

		y.domain([0, maxValue]);

		chart_group.append("g")
			.call(d3.axisLeft(y));


		chart_group.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.stadsdeel); })
			.attr("y", function(d) { return y(d["2014"]); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return chart_height - y(d["2014"]); });

		var year = 2014;

		chart_group.append("text")
       			.attr("class", "title")
        		.attr("y", -25)
        		.attr("x", chart_width / 2)        			
        		.style("text-anchor", "middle")
        		.text("Population of Amsterdam per city district in " + String(year));


        d3.select("#up")
        	.on("click", function(d) {
        		if (year!== 2018) {
        			year = year + 1;
        			chart_group.selectAll(".bar")
        				.transition()
        					.attr("y", function(d) { return y(d[String(year)]) })
        					.attr("height", function(d) { return chart_height - y(d[String(year)]); });

        			chart_group.select(".title")
        				.text("Population of Amsterdam per city district in " + String(year));
        		}
        	});

        d3.select("#down")
        .on("click", function(d) {
        	if (year !== 2014) {
				year = year - 1;
				chart_group.selectAll(".bar")
					.transition()
						.attr("x", function(d) { return x(d.stadsdeel) })
        				.attr("y", function(d) { return y(d[String(year)]); })
        				.attr("height", function(d) { return chart_height - y(d[String(year)]); });
        			};

        		chart_group.select(".title")
        			.text("Population of Amsterdam per city district in " + String(year));
			});

		
	});


