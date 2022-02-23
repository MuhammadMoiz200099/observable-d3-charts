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
        return PieChart(datasource, {
          name: (d) => d.name,
          value: (d) => d.value,
          width,
          height: 500,
        });
      }
    );
  main.define("datasource", ["FileAttachment"], function (FileAttachment) {
    return FileAttachment("dataset.csv").csv({ typed: true });
  });
  main.define("PieChart", ["d3"], function (d3) {
    return function PieChart(datasource) {
      console.log(datasource);
      // return Object.assign(svg.node(), { scales: { color } });
    };
  });
  return main;
}
