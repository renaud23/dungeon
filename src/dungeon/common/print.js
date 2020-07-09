export function printDungeon({ data, width }) {
  const [rows] = data.reduce(
    function ([rows, current], v, i) {
      const next = `${current}${v}`;
      if (i % width === width - 1) {
        return [[...rows, `${next}|${Math.trunc(i / width) + 1}`], ""];
      }
      return [rows, next];
    },
    [[], ""]
  );

  rows.forEach(function (row) {
    console.log(row);
  });
  console.log("/* - */");
}
