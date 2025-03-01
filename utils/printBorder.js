export default function printBorder(
  column_map,
  left,
  horizontal,
  cross,
  right,
) {
  const out = process.stdout;

  out.write(
    `${left}${horizontal.repeat(column_map[0] ? column_map[0] + 2 : 2)}`,
  );

  for (let i = 1; i < column_map.length; i++) {
    out.write(`${cross}${horizontal.repeat(column_map[i] + 2)}`);
  }

  out.write(`${right}\n`);
}
