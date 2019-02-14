var p = d3.select("body")
    .selectAll("p")
    .text("hello");

p.style("color", "red")
    .style("font-size", "72px");