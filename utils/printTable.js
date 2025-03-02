import borders from "./borders.js";
import printBorder from "./printBorder.js";
import lpad from "./lpad.js";

export default function printTable(matrix, max, format = null, header_enabled) {
  let total = 1;
  max.forEach((i) => (total += i + 3));

  // new max for border
  const newMax = [];
  format.forEach((i) => newMax.push(max[i]));

  // top border {{
  printBorder(
    newMax,
    borders.top_left,
    borders.horizontal,
    borders.top_t,
    borders.top_right,
  );
  // }}

  // print header if enabled
  if (header_enabled) {
    printRow(matrix[0], max);
    matrix.shift();

    printBorder(
      newMax,
      borders.left_t,
      borders.horizontal,
      borders.cross,
      borders.right_t,
    );
  }

  for (const row of matrix) {
    printRow(row, max, format);
  }

  // bottom border

  printBorder(
    newMax,
    borders.bottom_left,
    borders.horizontal,
    borders.bottom_t,
    borders.bottom_right,
  );
}

function printRow(row, max, format = null) {
  // fix row if they are more or less than columns in table
  if (row.length < max.length) {
    const diff = max.length - row.length;
    for (let i = 0; i < diff; i++) {
      row.push("");
    }
  }
  if (row.length > max.length) {
    row = row.slice(0, max.length);
  }

  let finalRow = "";
  if (format) {
    for (const pos of format) {
      finalRow += lpad(row[pos], max[pos]) + ` ${borders.vertical} `;
    }
  } else {
    row.forEach(
      (i, index) => (finalRow += lpad(i, max[index]) + ` ${borders.vertical} `),
    );
  }
  process.stdout.write(`${borders.vertical} ${finalRow}\n`);
}
