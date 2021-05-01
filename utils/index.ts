// Dependencies
import { format } from "date-fns";
import es from "date-fns/locale/es";

/**
 * Format the received date using [date-fns](https://date-fns.org/)
 * that is a lightweight library to format dates
 *
 * @param date - The date to format
 * @param formatter - The way to format the date
 *
 * @returns The string with the formatted date
 */
export const formatDate = (
  date: string | Date,
  formatter = "mm/dd/yyyy",
  lang = "en"
): string => {
  let locale;

  switch (lang) {
    case "es":
      locale = es;
      break;
    default:
      locale = undefined;
      break;
  }

  return format(new Date(date), formatter, {
    locale,
  });
};
