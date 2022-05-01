export default function getRatingColor(value) {
  if (value > 90) {
    return "green"
  } else if (value > 80) {
    return "violet"
  } else if (value > 70) {
    return "rose"
  }
}
