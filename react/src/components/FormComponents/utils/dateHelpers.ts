export const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const dayNamesLetter: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const monthsLong: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsShort: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

export const formatCalendarDate = (
  m: string | number,
  d: string | number,
  y: string | number
): string => `${(typeof m === 'string' ? parseInt(m) : m) + 1}/${d}/${y}`
