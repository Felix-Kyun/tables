const istream = process.stdin;

// opts
istream.setEncoding("utf8");
// istream.setRawMode(true);

// read data
const chunks = [];

istream.on("readable", () => {
  let chunk = istream.read();

  while (chunk !== null) {
    chunks.push(chunk);
    chunk = istream.read();
  }
});

// processData 
// @cb: function(data)
// @return: void
// @data is the data read from stdin
export default function processData(cb) {
  istream.on("end", () => cb(chunks.join("")));
}
