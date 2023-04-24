import moment from "moment";

export function formatDate(date: Date, format: string) {
  return moment(date).format(format);
}
