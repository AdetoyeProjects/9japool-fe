export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.startsWith('234')) {
    return `+${cleaned}`
  }

  if (cleaned.startsWith('0')) {
    return `+234${cleaned.slice(1)}`
  }

  return `+234${cleaned}`
}
