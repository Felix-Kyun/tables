export default function lpad(text, len) {
  return `${text}${" ".repeat(len - text.length)}`;
}

