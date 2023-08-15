export function toCurrencyValue(value: string) {
  const parsedValue = parseFloat(value.replace("$", "")) * 100;
  return Math.round(parsedValue);
}

export function fromCurrencyValue(value: number) {
  return (value / 100).toFixed(2);
}

export const Currency = {
  type: Number,
  set: toCurrencyValue,
  get: fromCurrencyValue,
};
