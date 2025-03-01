import borders from "./borders.js";
import printBorder from "./printBorder.js";
import lpad from "./lpad.js";

export default function printTable(matrix, max) {
  let total = 1;
  max.forEach((i) => (total += i + 3));

  const out = process.stdout;

  // top border {{
  printBorder(
    max,
    borders.top_left,
    borders.horizontal,
    borders.top_t,
    borders.top_right,
  );
  // }}

  for (const row of matrix) {
    let finalRow = "";
    row.forEach(
      (i, index) => (finalRow += lpad(i, max[index]) + ` ${borders.vertical} `),
    );
    out.write(`${borders.vertical} ${finalRow}\n`);
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
