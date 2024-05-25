export function datetime(date) {
  return date.toISOString().replace('T', ' ').split('.')[0]
}
