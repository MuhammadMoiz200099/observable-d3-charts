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
        return BarChart(datasource);
      }
    );
  main.define("datasource", ["FileAttachment"], function (FileAttachment) {
    return FileAttachment("dataset.csv").csv({ typed: true });
  });
  main.define("BarChart", ["d3"], function (d3) {
    return function BarChart(datasource) {
      console.log(datasource);
      // return Object.assign(svg.node(), { scales: { color } });
    };
  });
  return main;
}
