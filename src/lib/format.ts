const integerFormatter = new Intl.NumberFormat("en-US");
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});
const decimalFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1
});
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

export function formatInteger(value: number) {
  return integerFormatter.format(Math.round(value));
}

export function formatCompact(value: number) {
  return compactFormatter.format(value);
}

export function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

export function formatDateLabel(value: string) {
  return shortDateFormatter.format(new Date(value));
}
