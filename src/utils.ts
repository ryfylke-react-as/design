export function pickTextColor(
  bgColor: string,
  lightColor = "#fff",
  darkColor = "#000"
) {
  let color =
    bgColor.charAt(0) === "#"
      ? bgColor.substring(1, 7)
      : bgColor;
  if (color.split("").every((c) => c === "f")) {
    return darkColor;
  }
  let r = parseInt(color.substring(0, 2), 16); // hexToR
  let g = parseInt(color.substring(2, 4), 16); // hexToG
  let b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186
    ? darkColor
    : lightColor;
}
