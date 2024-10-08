import dayjs, { Dayjs } from 'dayjs';

export const RemoveTelFormatting = (value: string) => value.replace(/\s+/g, '');
export const ConvertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const FormatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'id-ID',
    dateTimeOptions,
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'id-ID',
    dateDayOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'id-ID',
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'id-ID',
    timeOptions,
  );

  const translatedTime = () => {
    const currentHour = new Date(dateString).getHours();

    if (currentHour >= 4 && currentHour < 10) {
      return 'morning';
    } else if (currentHour >= 10 && currentHour < 15) {
      return 'noon';
    } else if (currentHour >= 15 && currentHour < 19) {
      return 'evening';
    } else {
      return 'night';
    }
  };

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
    translatedTime: translatedTime(),
  };
};

// FORMAT DATE TO DAYJS
export const FormatDateToDayJs = (date: Date | Dayjs | string | null) => {
  if (date) {
    return dayjs(date);
  } else {
    return null;
  }
};

// COVERT DATE TO ISO LOCAL TIME
export const ConvertToISOLocalTime = (date: Date | string) => {
  const DateValue = new Date(date);

  return new Date(
    DateValue.getTime() - DateValue.getTimezoneOffset() * 60000,
  ).toISOString();
};
