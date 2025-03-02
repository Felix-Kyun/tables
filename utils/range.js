export default function* range(start, end = null, step = 1) {
  if (end === null) {
    [start, end] = [0, start];
  }

  while (step > 0 ? start < end : start > end) {
    yield start;
    start += step;
  }
}
