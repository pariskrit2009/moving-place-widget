export function formatShortDate(dateStr: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr.includes("/") ? dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") : dateStr);

  if (Number.isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatIsoDate(isoDate: string) {
  if (!isoDate) {
    return "";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
