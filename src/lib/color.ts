export function hexToRgba(hex: string, alpha: number): string {
  if (!hex) {
    return `rgba(2, 132, 199, ${alpha})`;
  }

  let sanitized = hex.trim();
  if (sanitized.startsWith("#")) {
    sanitized = sanitized.slice(1);
  }

  if (sanitized.length === 3) {
    sanitized = sanitized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (sanitized.length !== 6) {
    return `rgba(2, 132, 199, ${alpha})`;
  }

  const bigint = Number.parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
