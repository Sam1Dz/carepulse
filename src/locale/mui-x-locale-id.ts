import { PickersLocaleText } from '@mui/x-date-pickers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const idIdDatePickers: PickersLocaleText<any> = {
  // Calendar navigation
  previousMonth: 'Bulan sebelumnya',
  nextMonth: 'Bulan depan',

  // View navigation
  openPreviousView: 'Buka tampilan sebelumnya',
  openNextView: 'Buka tampilan berikutnya',
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === 'year'
      ? 'tampilan tahun terbuka, beralih ke tampilan kalender'
      : 'tampilan kalender terbuka, beralih ke tampilan tahun',

  // DateRange labels
  start: 'Mulai',
  end: 'Selesai',
  startDate: 'Tanggal mulai',
  startTime: 'Waktu mulai',
  endDate: 'Tanggal selesai',
  endTime: 'Waktu selesai',

  // Action bar
  cancelButtonLabel: 'Batal',
  clearButtonLabel: 'Bersihkan',
  okButtonLabel: 'Simpan',
  todayButtonLabel: 'Hari Ini',

  // Toolbar titles
  datePickerToolbarTitle: 'Pilih tanggal',
  dateTimePickerToolbarTitle: 'Pilih tanggal & waktu',
  timePickerToolbarTitle: 'Pilih waktu',
  dateRangePickerToolbarTitle: 'Pilih rentang tanggal',

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Select ${view}. ${
      time === null
        ? 'Tidak ada waktu yang dipilih'
        : `Waktu yang dipilih adalah ${adapter.format(time, 'fullTime')}`
    }`,
  hoursClockNumberText: (hours) => `${hours} jam`,
  minutesClockNumberText: (minutes) => `${minutes} menit`,
  secondsClockNumberText: (seconds) => `${seconds} detik`,

  // Digital clock labels
  selectViewText: (view) => `Pilih ${view}`,

  // Calendar labels
  calendarWeekNumberHeaderLabel: 'Mingggu ke',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: (weekNumber) => `Minggu ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

  // Open picker labels
  openDatePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Pilih tanggal, tanggal yang terpilih adalah ${utils.format(value, 'fullDate')}`
      : 'Pilih tanggal',
  openTimePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Pilih waktu, waktu yang terpilih adalah ${utils.format(value, 'fullTime')}`
      : 'Pilih waktu',

  fieldClearLabel: 'Bersihkan',

  // Table labels
  timeTableLabel: 'pilih waktu',
  dateTableLabel: 'pilih tanggal',

  // Field section placeholders
  fieldYearPlaceholder: (params) => 'Y'.repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) =>
    params.contentType === 'letter' ? 'MMMM' : 'MM',
  fieldDayPlaceholder: () => 'DD',
  fieldWeekDayPlaceholder: (params) =>
    params.contentType === 'letter' ? 'EEEE' : 'EE',
  fieldHoursPlaceholder: () => 'hh',
  fieldMinutesPlaceholder: () => 'mm',
  fieldSecondsPlaceholder: () => 'ss',
  fieldMeridiemPlaceholder: () => 'aa',

  // View names
  year: 'Tahun',
  month: 'Bulan',
  day: 'Hari',
  weekDay: 'Hari kerja',
  hours: 'Jam',
  minutes: 'Menit',
  seconds: 'Detik',
  meridiem: '(AM/PM)',

  // Common
  empty: 'Kosong',
};
