// stdin to table
import processData from "./utils/stdin.js";
import printTable from "./utils/printTable.js";
import opts from "./utils/opts.js";

processData((data) => {
  const rows = data.split("\n");

  // if the last elm is empty then remove it
  if (rows[rows.length - 1] === "") rows.pop();

  // final data
  const matrix = [];
  const columnMax = [];

  rows.forEach((row, rindex) => {
    matrix.push([]);
    const columns = row.split(opts.delimiter);

    columns.forEach((column, cindex) => {
      // trim the item if enabled
      if (opts.trim) column = column.trim();

      // if column length is larger than update
      if (!columnMax[cindex] || columnMax[cindex] < column.length)
        columnMax[cindex] = column.length;

      matrix[rindex].push(column);
    });
  });

  printTable(matrix, columnMax);
});

