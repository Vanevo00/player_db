const formatDate = (date: string) => {
  const dateToBeFormatted = new Date(date)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return `${dateToBeFormatted.getDate()} ${monthNames[dateToBeFormatted.getMonth()]} ${dateToBeFormatted.getFullYear()} ${dateToBeFormatted.getHours()}:${dateToBeFormatted.getMinutes()}`
}

export default formatDate
