export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([
    ["dataset.csv", new URL("./../../dataset.csv", import.meta.url)],
  ]);
  main.builtin(
    "FileAttachment",
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );
  main
    .variable(observer("chart"))
    .define(
      "chart",
      ["BarChart", "datasource", "width"],
      function (BarChart, datasource, width) {
        return BarChart(datasource, "NO", "#69b3a2");
      }
    );
  main.define("datasource", ["FileAttachment"], function (FileAttachment) {
    return FileAttachment("dataset.csv").csv({ typed: true });
  });
  main.define("BarChart", ["d3"], function (d3) {
    return function BarChart(datasource, selectedVar, selectedColour) {
      let margin = { top: 30, right: 30, bottom: 90, left: 60 },
        width = 1300 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
      let data = datasource;

      const svg = d3
        .create("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

      const mainG = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleBand().range([0, width]).padding(0.2);
      const xAxis = mainG
        .append("g")
        .attr("transform", "translate(0," + height + ")");

      const y = d3.scaleLinear().range([height, 0]);
      const yAxis = mainG.append("g").attr("class", "myYaxis");

      let xDomain = [...new Set(data.map((d) => d["Organisme"]))];
      x.domain(xDomain);
      xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-40)")
        .style("text-anchor", "end")
        .style("font-size", 12);
      y.domain([
        0,
        d3.max(data, function (d) {
          return d["Polluant"] === selectedVar ? +d["valeur"] : 0;
        }),
      ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      let puredata = JSON.parse(JSON.stringify(data));
      delete puredata.columns;

      var u = mainG.selectAll("rect").data(puredata);

      u.enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) {
          return x(d["Organisme"]);
        })
        .attr("y", function (d) {
          return y(d["Polluant"] === selectedVar ? +d["valeur"] : 0);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          console.log(
            height - y(d["Polluant"] === selectedVar ? +d["valeur"] : 0)
          );
          return height - y(d["Polluant"] === selectedVar ? +d["valeur"] : 0);
        })
        .style("fill", selectedColour);

      return svg.node();
    };
  });
  return main;
}
