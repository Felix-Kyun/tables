// stdin to table
const symbols = require("./symbols.js");
const chunks = [];
const istream = process.stdin;
const delimiter = /\s+/;
const trimEnabled = true;

// istream.setRawMode(true);
istream.setEncoding("utf8");

istream.on("readable", () => {
  let chunk = istream.read();

  while (chunk !== null) {
    chunks.push(chunk);
    chunk = istream.read();
  }
});

istream.on("end", () => {
  const data = chunks.join("");
  const rows = data.split("\n");

  // if the last elm is empty then remove it
  if (rows[rows.length - 1] === "") rows.pop();

  // final data
  const matrix = [];
  const columnMax = [];

  rows.forEach((row, rindex) => {
    matrix.push([]);
    const columns = row.split(delimiter);

    columns.forEach((column, cindex) => {
      // trim the item if enabled
      if (trimEnabled) column = column.trim();

      // if column length is larger than update
      if (!columnMax[cindex] || columnMax[cindex] < column.length)
        columnMax[cindex] = column.length;

      matrix[rindex].push(column);
    });
  });

  printTable(matrix, columnMax);
});

function printTable(matrix, max) {
  let total = 1;
  max.forEach((i) => (total += i + 3));

  const out = process.stdout;

  // top border {{
  printLine(
    max,
    symbols.top_left,
    symbols.horizontal,
    symbols.top_t,
    symbols.top_right,
  );
  // }}

  for (const row of matrix) {
    let finalRow = "";
    row.forEach(
      (i, index) => (finalRow += lpad(i, max[index]) + ` ${symbols.vertical} `),
    );
    process.stdout.write(`${symbols.vertical} ${finalRow}\n`);
  }

  // bottom border

  printLine(
    max,
    symbols.bottom_left,
    symbols.horizontal,
    symbols.bottom_t,
    symbols.bottom_right,
  );
}

function lpad(text, len) {
  return `${text}${" ".repeat(len - text.length)}`;
}

function printLine(column_map, left, horizontal, cross, right) {
  const out = process.stdout;

  out.write(`${left}${horizontal.repeat(column_map[0] ? column_map[0] + 2 : 2)}`);

  for (let i = 1; i < column_map.length; i++) {
    out.write(`${cross}${horizontal.repeat(column_map[i] + 2)}`);
  }

  out.write(`${right}\n`);
}
