function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    selector.innerHTML = ''
    var svg = d3.select(selector).append("svg")
        .attr("width", window.screen.availWidth / 2 - 20)
        .attr("height", window.screen.availHeight - 150)
        .append("g")
        .attr("transform", `translate(${window.screen.availWidth / 5}, ${window.screen.availHeight / 3})`);


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
            .data(words, function (d) {
                return d.text;
            })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function (d, i) {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function (d) {
                return d.text;
            });

        //Entering and existing words
        cloud
            .transition()
            .duration(600)
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
            .duration(200)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function (words) {
            d3.layout.cloud().size([window.screen.availWidth / 2 - 10, window.screen.availHeight - 150])
                .words(words)
                .padding(5)
                .rotate(function () {
                    return 0
                })
                .font("Impact")
                .fontSize(function (d) {
                    return d.size * window.screen.availWidth / 1920;
                })
                .on("end", draw)
                .start();
        }
    }

}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, words) {
    vis.update(words)
}

export {
    showNewWords,
    wordCloud
}