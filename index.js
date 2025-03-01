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
  const columnMax = []; // stores the max length used in each of the columns

  // add headers if enabled
  if (opts.customHeader) {
    matrix.push([]);
    const headers = opts.customHeader.split(",");
    headers.forEach((header, index) => {
      matrix[0].push(header);

      // if column length is larger then update
      if (!columnMax[index] || columnMax[index] < header.length)
        columnMax[index] = header.length;
    });
  }

  rows.forEach((row) => {
    const current_row = [];
    const columns = row.split(opts.delimiter);

    columns.forEach((column, cindex) => {
      // trim the item if enabled
      if (opts.trim) column = column.trim();

      // if column length is larger than update
      if (!columnMax[cindex] || columnMax[cindex] < column.length)
        columnMax[cindex] = column.length;

      current_row.push(column);
    });

    matrix.push(current_row);
  });

  printTable(matrix, columnMax, opts.format, (opts.customHeader || opts.header));
});
