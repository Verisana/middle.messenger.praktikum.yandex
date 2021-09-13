export const namePattern = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яёЁ-]*$/
export const loginPattern = /^[A-Za-z-_0-9]{3,20}$/
export const emailPattern = /^[A-Za-z0-9-]+@[A-Za-z0-9]+.[a-z]+$/
export const passwordPattern = /^.{8,40}$/
export const phonePattern = /^[+0-9]{10,15}$/
export const messagePattern = /.+/

export const validateValue = (
    value: string,
    pattern: RegExp,
    additionalChecks?: (value: string) => boolean
): boolean => {
    if (value.length === 0) return false

    if (additionalChecks !== undefined) {
        return additionalChecks(value) && pattern.test(value)
    }
    return pattern.test(value)
}

export const validateName = (value: string): boolean => {
    return validateValue(value, namePattern)
}

export const validateLogin = (value: string): boolean => {
    const restrictIfOnlyDigits = (val: string): boolean => {
        const onlyDigit = /^\d*$/
        // Сначала выясняем, что там только цифры. А потом возвращаем false,
        // если так
        return !onlyDigit.test(val)
    }
    return validateValue(value, loginPattern, restrictIfOnlyDigits)
}

export const validateEmail = (value: string): boolean => {
    return validateValue(value, emailPattern)
}

export const validatePassword = (value: string): boolean => {
    const forceDigitAndUpperChar = (val: string): boolean => {
        const upperChar = /[A-Z]+/g
        const digit = /\d+/g

        return upperChar.test(val) && digit.test(val)
    }

    return validateValue(value, passwordPattern, forceDigitAndUpperChar)
}

export const validatePhone = (value: string): boolean => {
    return validateValue(value, phonePattern)
}

export const validateMessage = (value: string): boolean => {
    return validateValue(value, messagePattern)
}

export const validators: Record<string, (value: string) => boolean> = {
    first_name: validateName,
    second_name: validateName,
    login: validateLogin,
    email: validateEmail,
    password: validatePassword,
    phone: validatePhone,
    message: validateMessage
}

export const errorMessages: Record<string, string> = {
    first_name:
        "Допускается только латиница или кириллица. Первая буква должна быть " +
        "заглавной, без пробелов и без цифр, нет спецсимволов (допустим " +
        "только дефис)",
    second_name:
        "Допускается только латиница или кириллица. Первая буква должна быть " +
        "заглавной, без пробелов и без цифр, нет спецсимволов (допустим " +
        "только дефис)",
    login:
        "Введите login от 3 до 20 символов: латиница, может содержать цифры, " +
        "но не состоять из них. Без пробелов, без спецсимволов (допустимы " +
        "дефис и нижнее подчёркивание)",
    email:
        "Введите email на латинице. Может включать цифры и спецсимволы " +
        "вроде дефиса. Обязательно должна быть «собака» (@) и точка после " +
        "неё, но перед точкой обязательно должны быть буквы",
    password:
        "Введите пароль от 8 до 40 символов, обязательно хотя бы одна " +
        "заглавная буква и цифра",
    phone:
        "Введите телефон от 10 до 15 символов. Состоит из цифр, может " +
        "начинается с плюса",
    message: "Сообщение не может быть пустым"
}

export const inputValidationCallback = (event: Event) => {
    const inputElement = event.target as HTMLInputElement
    const validator = validators[inputElement.name]
    if (!validator(inputElement.value)) {
        inputElement.setCustomValidity(errorMessages[inputElement.name])
        console.log("error!")
    }
}
