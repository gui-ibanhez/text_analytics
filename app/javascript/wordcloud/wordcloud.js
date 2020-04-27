import * as d3WordcloudJs from "../d3-wordcloud/d3-wordcloud.js"
import * as d3BarJs from "../d3-bar/d3-bar.js"

document.addEventListener("DOMContentLoaded", () => {
  let cloud_form1 = document.getElementById("cloud_form1")
  let cloud_form2 = document.getElementById("cloud_form2")
  let date1 = cloud_form1.elements.selectDate1
  let date2 = cloud_form2.elements.selectDate2
  let score1 = cloud_form1.elements.selectScore1
  let score2 = cloud_form2.elements.selectScore2
  let button1 = cloud_form1.elements.enviar1
  let button2 = cloud_form2.elements.enviar2
  let graph1 = cloud_form1.elements.selectGraph1
  let graph2 = cloud_form2.elements.selectGraph2

  cloud_form1.addEventListener("submit", (e) => {
    e.preventDefault()
  })

  cloud_form2.addEventListener("submit", (e) => {
    e.preventDefault()
  })

  button1.addEventListener("click", () => {
    let sel = document.getElementById('graph1')
    let url = `/api/v1/cloudword/freqs?anomes=${date1.value}&score=${score1.value}`

    fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
        showGraph(response, sel, graph1.value)
      })
      .catch(err => {
        alert("Houve um erro na sua requisição. Favor checar os parâmetros da consulta.");
      })
  })

  button2.addEventListener("click", () => {
    let sel = document.getElementById('graph2')
    let url = `/api/v1/cloudword/freqs?anomes=${date2.value}&score=${score2.value}`

    fetch(url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then(response => {
        showGraph(response, sel, graph2.value)
      })
      .catch(err => {
        alert("Houve um erro na sua requisição. Favor checar os parâmetros da consulta.");
      })
  })

  function showGraph(data, selector, graph) {
    if(graph === 'Wordcloud'){
      let myWordCloud = d3WordcloudJs.wordCloud(selector)
      d3WordcloudJs.showNewWords(myWordCloud, data)
    } else if(graph === 'Barra') {
      d3BarJs.showBars(data, selector)
    }
  }

})