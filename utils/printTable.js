import borders from "./borders.js";
import printBorder from "./printBorder.js";
import lpad from "./lpad.js";

export default function printTable(matrix, max, header_enabled) {
  let total = 1;
  max.forEach((i) => (total += i + 3));

  // top border {{
  printBorder(
    max,
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
      max,
      borders.left_t,
      borders.horizontal,
      borders.cross,
      borders.right_t,
    );
  }

  for (const row of matrix) {
    printRow(row, max);
  }

  // bottom border

  printBorder(
    max,
    borders.bottom_left,
    borders.horizontal,
    borders.bottom_t,
    borders.bottom_right,
  );
}

function printRow(row, max) {
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

  row.forEach(
    (i, index) => (finalRow += lpad(i, max[index]) + ` ${borders.vertical} `),
  );
  process.stdout.write(`${borders.vertical} ${finalRow}\n`);
}
