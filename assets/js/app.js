// Step 1: Set up our chart
//= ================================
const svgWidth = 960;
const svgHeight = 500;

const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3.select("#scatter")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// and define values to be used
// =================================
d3.csv('assets/data/data.csv').then(function (censusData) {
    console.log(censusData);
    censusData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare
    })

// Create a scale for your independent (x) coordinates
const xScale = d3.scaleLinear()
.domain([d3.min(censusData, d=>d.poverty)*.95,d3.max(censusData, d=>d.poverty)])
.range([0,width]);

    // Create a scale for your dependent (y) coordinates
const yScale = d3.scaleLinear()
.domain([d3.min(censusData, d=>d.healthcare)*.85, d3.max(censusData, d=>d.healthcare)])
.range([height, 0]);

// Use bottomAxis and leftAxis to create the chart's axes using the passed in scales.
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

    // append x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "18px")
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .style("font-size", "18px")
        .call(leftAxis);

  // Create Circles
  // ==============================
  const circlesGroup = chartGroup.selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "violet")
    .attr("opacity", ".3");

    const textGroup = chartGroup.selectAll("text.abbr")
    .data(censusData)
    .enter()
    .append("text")
    .attr("class","abbr")
    .attr("x", d => xScale(d.poverty)-5)
    .attr("y", d => yScale(d.healthcare)+2)
    .attr("opacity","0.5")
    .text(d=>d.abbr)

// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - chartMargin.left + 40)
.attr("x", 0 - (height / 2)-100)
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + chartMargin.top+30})`)
.attr("class", "axisText")
.text("In Poverty (%)");
}).catch(function (error) {
console.log(error);


});