function showBars(data, selector) {
    //sort bars based on value

    selector.innerHTML = ""

    let fill = d3.scale.category20();

    data = data.sort(function (a, b) {
        return d3.ascending(a.size, b.size);
    }).map(d => {
        return {
            'name': d.text,
            'value': (parseFloat(d.size) / 60).toFixed(2)
        }
    })

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    let margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 105
    };

    let width = window.screen.availWidth / 2 - margin.left - margin.right;
    let height = window.screen.availHeight - margin.top - margin.bottom;

    let svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    let y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    //make y axis to show bar names
    let yAxis = d3.svg.axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

    let gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    let bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .style("fill", function (d, i) {
            return fill(i);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value) * 0.9;
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.rangeBand() / 2 + 4;
        })
        .style("font-family", "Impact")
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.value) * 0.9 + 3;
        })
        .text(function (d) {
            return d.value;
        });
}

export { showBars }