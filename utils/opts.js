import { Command } from "commander";

export const program = new Command();

program
  .name("tables")
  .version("1.0.0")
  .description("a simple table formatter for cli");

program
  .option(
    "-d, --delimiter <delimiter>",
    "delimiter to split the columns",
    "\\s+",
  )
  .option("-T, --no-trim", "trim the columns", true)
  .option("-H, --header", "first row is header", false)
  .option("-c, --custom-header <header>", "custom header", false)
  .option("-l, --limit <limit>", "limit the number of rows to display", 0)
  .option("-f, --format <format>", "format the output", false);

const opts = program.parse(process.argv).opts();

// process the options into the correct format
opts.delimiter = new RegExp(opts.delimiter);
if (opts.limit) opts.limit = parseInt(opts.limit);
if (opts.format) {
  opts.format = opts.format.split(",").map((i) => {
    // remove any whitespace and convert to number
    return Number(i.trim());
  });
}
if (opts.customHeader) opts.customHeader = opts.customHeader.split(",");

export default opts;
