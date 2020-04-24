document.addEventListener("DOMContentLoaded", () => {
  let cloud_form1 = document.getElementById("cloud_form1")
  let cloud_form2 = document.getElementById("cloud_form2")
  let date1 = cloud_form1.elements.selectDate1
  let date2 = cloud_form2.elements.selectDate2
  let score1 = cloud_form1.elements.selectScore1
  let score2 = cloud_form2.elements.selectScore2
  let button1 = cloud_form1.elements.enviar1
  let button2 = cloud_form2.elements.enviar2

  cloud_form1.addEventListener("submit", (e) => {
    e.preventDefault()
  })
  
  cloud_form2.addEventListener("submit", (e) => {
    e.preventDefault()
  })

  button1.addEventListener("click", () => {
    let sel = document.getElementById('graph1')
    let myWordCloud = wordCloud(sel)
    let url = `/api/v1/cloudword/freqs?anomes=${date1.value}&score=${score1.value}`
    
    fetch(url, {
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      showNewWords(myWordCloud, response)
    })
    .catch(err => {
      alert("Houve um erro na sua requisição. Favor checar os parâmetros da consulta.");
    })
  })

  button2.addEventListener("click", () => {
    let sel = document.getElementById('graph2')
    let myWordCloud = wordCloud(sel)
    let url = `/api/v1/cloudword/freqs?anomes=${date2.value}&score=${score2.value}`
    
    fetch(url, {
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then(response => {
      showNewWords(myWordCloud, response)
    })
    .catch(err => {
      alert("Houve um erro na sua requisição. Favor checar os parâmetros da consulta.");
    })
  })

  function wordCloud(selector) {

    var fill = d3.scale.category20();
  
    //Construct the word cloud's SVG element
    selector.innerHTML = ''
    var svg = d3.select(selector).append("svg")
        .attr("width", 700)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(350,250)");
  
  
    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })
  
        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });
  
        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
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
        update: function(words) {
            d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function() { return 0 })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
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

})