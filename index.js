// stdin to table
import processData from "./utils/stdin.js";
import printTable from "./utils/printTable.js";
import opts from "./utils/opts.js";
import range from "./utils/range.js";

processData((data) => {
  const rows = data.split("\n");

  // if the last elm is empty then remove it
  if (rows[rows.length - 1] === "") rows.pop();

  // final data
  const matrix = [];
  const columnMax = []; // stores the max length used in each of the columns

  // add headers if enabled
  if (opts.customHeader) {
    const header_arr = [];
    const headers = opts.customHeader;
    headers.forEach((header, index) => {
      header_arr.push(header);

      // if column length is larger then update
      if (!columnMax[index] || columnMax[index] < header.length)
        columnMax[index] = header.length;
    });
    matrix.push(header_arr);
  }

  const processRow = (row, rindex) => {
    // skip the row if skip is enabled
    if (opts.skip && rindex < opts.skip) return;

    // limit results if enabled
    if (opts.limit && rindex >= opts.limit + opts.skip) return;

    const current_row = [];
    row = row.split(opts.delimiter);

    // if format enabled only keep the rows we need
    if (opts.format) {
      // row = row.filter((_, index) => opts.format.includes(index));
      const new_row = [];
      opts.format.forEach((index) => {
        new_row.push(row[index]);
      });
      row = new_row;
    }

    row.forEach((column, cindex) => {
      if (opts.trim) column = column.trim();

      if (!columnMax[cindex] || columnMax[cindex] < column.length) {
        columnMax[cindex] = column.length;
      }

      current_row.push(column);
    });

    matrix.push(current_row);
  };

  rows.forEach(processRow);

  printTable(matrix, columnMax, opts.customHeader || opts.header);
});
