/**
 * Convert expires time to seconds
 * @param {string} expiresIn - The time to expire
 * @returns {number} The time in seconds
 */
export const convertExToSeconds = (expiresIn: string) => {
  const unit = expiresIn.substring(expiresIn.length - 1)
  let seconds = parseInt(expiresIn.split(unit)[0])

  switch (unit) {
    case 'm':
      seconds *= 60
      break
    case 'h':
      seconds *= 60 * 60
      break
    case 'd':
      seconds *= 60 * 60 * 24
      break
    default:
      throw new Error('Invalid unit')
  }

  return seconds
}

export const getTime = (dueDate: Date, value: number, unit: string) => {
  if (unit === 'm') return new Date(dueDate).setMinutes(new Date(dueDate).getMinutes() - value)

  if (unit === 'h') return new Date(dueDate).setHours(new Date(dueDate).getHours() - value)

  return new Date(dueDate)
}
