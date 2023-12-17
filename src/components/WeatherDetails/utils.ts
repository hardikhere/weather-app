export function kelvinToCelsius(kelvin: number) {
  const celsius = kelvin - 273.15;
  return Math.round(celsius);
}
