import { inputFieldNames } from "../consts"

export const namePattern = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яёЁ-]*$/
export const loginPattern = /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/
export const emailPattern = /^[A-Za-z0-9-]+@[A-Za-z0-9]+\.[a-z]+$/
export const passwordPattern = /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/
export const phonePattern = /^[+0-9]{10,15}$/
export const messagePattern = /.+/

export const validateValue = (
  value: string,
  pattern: RegExp,
  additionalChecks?: (value: string) => boolean
): boolean => {
  if (additionalChecks !== undefined) {
    return additionalChecks(value) && pattern.test(value)
  }
  return pattern.test(value)
}

export const validateName = (value: string): boolean => {
  return validateValue(value, namePattern)
}

export const validateLogin = (value: string): boolean => {
  return validateValue(value, loginPattern)
}

export const validateEmail = (value: string): boolean => {
  return validateValue(value, emailPattern)
}

export const validatePassword = (value: string): boolean => {
  return validateValue(value, passwordPattern)
}

export const validatePhone = (value: string): boolean => {
  return validateValue(value, phonePattern)
}

export const validateMessage = (value: string): boolean => {
  return validateValue(value, messagePattern)
}

export const validators: Record<string, (value: string) => boolean> = {
  [inputFieldNames.firstName]: validateName,
  [inputFieldNames.secondName]: validateName,
  [inputFieldNames.login]: validateLogin,
  [inputFieldNames.email]: validateEmail,
  [inputFieldNames.password]: validatePassword,
  [inputFieldNames.oldPassword]: validatePassword,
  [inputFieldNames.newPassword]: validatePassword,
  [inputFieldNames.phone]: validatePhone,
  [inputFieldNames.message]: validateMessage,
  [inputFieldNames.avatar]: () => true,
  [inputFieldNames.searchQuery]: () => true
}

export const errorMessages: Record<string, string> = {
  [inputFieldNames.avatar]: "",
  [inputFieldNames.firstName]:
    "Допускается только латиница или кириллица. Первая буква должна быть " +
    "заглавной, без пробелов и без цифр, нет спецсимволов (допустим " +
    "только дефис)",
  [inputFieldNames.secondName]:
    "Допускается только латиница или кириллица. Первая буква должна быть " +
    "заглавной, без пробелов и без цифр, нет спецсимволов (допустим " +
    "только дефис)",
  [inputFieldNames.login]:
    "Введите login от 3 до 20 символов: латиница, может содержать цифры, " +
    "но не состоять из них. Без пробелов, без спецсимволов (допустимы " +
    "дефис и нижнее подчёркивание)",
  [inputFieldNames.email]:
    "Введите email на латинице. Может включать цифры и спецсимволы " +
    "вроде дефиса. Обязательно должна быть «собака» (@) и точка после " +
    "неё, но перед точкой обязательно должны быть буквы",
  [inputFieldNames.password]:
    "Введите пароль от 8 до 40 символов, обязательно хотя бы одна " +
    "заглавная буква и цифра",
  [inputFieldNames.oldPassword]:
    "Введите пароль от 8 до 40 символов, обязательно хотя бы одна " +
    "заглавная буква и цифра",
  [inputFieldNames.newPassword]:
    "Введите пароль от 8 до 40 символов, обязательно хотя бы одна " +
    "заглавная буква и цифра",
  [inputFieldNames.phone]:
    "Введите телефон от 10 до 15 символов. Состоит из цифр, может " +
    "начинается с плюса",
  [inputFieldNames.message]: "Сообщение не может быть пустым",
  [inputFieldNames.searchQuery]: ""
}

export const inputValidationCallback = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const validator = validators[inputElement.name]

  if (validator === undefined) {
    throw new Error(`Can not find name ${inputElement.name}`)
  }

  if (!validator(inputElement.value)) {
    inputElement.setCustomValidity(errorMessages[inputElement.name])
  } else {
    inputElement.setCustomValidity("")
  }
}

export function isFormDataValid(form: HTMLFormElement): boolean {
  // Здесь TS не мог распарсить, что HTMLCollection мог быть проитерирован,
  // Поэтому поставил any
  // https://stackoverflow.com/questions/51723962/typescript-nodelistofelement-is-not-an-array-type-or-a-string-type
  for (const inputElement of form.getElementsByTagName("input") as any) {
    const validator = validators[inputElement.name]
    if (!validator(inputElement.value)) {
      inputElement.setCustomValidity(errorMessages[inputElement.name])
      return false
    }
  }
  return true
}
