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
      ["PieChart", "datasource", "width"],
      function (PieChart, datasource, width) {
        return PieChart(datasource);
      }
    );
  main.define("datasource", ["FileAttachment"], function (FileAttachment) {
    return FileAttachment("dataset.csv").csv({ typed: true });
  });
  main.define("PieChart", ["d3"], function (d3) {
    return function PieChart(datasource) {
      const dataObject = {};
      datasource.map((data) => {
        if (dataObject[data.Polluant]) {
          dataObject[data.Polluant].push(data.valeur);
        } else {
          dataObject[data.Polluant] = [];
        }
      });
      const data = [];
      for (let key in dataObject) {
        const sum = dataObject[key].reduce((a, b) => a + b);
        data.push({
          name: key,
          value: sum,
        });
      }
      let title;
      let width = 840;
      let height = 600;
      let innerRadius = 0;
      let outerRadius = Math.min(width, height) / 2;
      let labelRadius = innerRadius * 0.2 + outerRadius * 0.8;
      let format = ",";
      let names;
      let colors;
      let stroke = innerRadius > 0 ? "none" : "white";
      let strokeWidth = 1;
      let strokeLinejoin = "round";
      let padAngle = stroke === "none" ? 1 / outerRadius : 0;
      const N = d3.map(data, (d) => d.name);
      const V = d3.map(data, (d) => d.value);
      const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

      if (names === undefined) names = N;
      names = new d3.InternSet(names);

      if (colors === undefined) colors = d3.schemeSpectral[names.size];
      if (colors === undefined)
        colors = d3.quantize(
          (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
          names.size
        );

      const color = d3.scaleOrdinal(names, colors);
      if (title === undefined) {
        const formatValue = d3.format(format);
        title = (i) => `${N[i]}\n${formatValue(V[i])}`;
      } else {
        const O = d3.map(data, (d) => d);
        const T = title;
        title = (i) => T(O[i], i, data);
      }

      const arcs = d3
        .pie()
        .padAngle(padAngle)
        .sort(null)
        .value((i) => V[i])(I);
      const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      const arcLabel = d3
        .arc()
        .innerRadius(labelRadius)
        .outerRadius(labelRadius);
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      svg
        .append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", (d) => color(N[d.data]))
        .attr("d", arc)
        .append("title")
        .text((d) => title(d.data));

      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data((d) => {
          const lines = `${title(d.data)}`.split(/\n/);
          return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
        })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 1.1}em`)
        .attr("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d);

      return Object.assign(svg.node(), { scales: { color } });
    };
  });
  return main;
}
