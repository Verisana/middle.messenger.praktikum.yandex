import {
    emailPattern,
    inputValidationCallback,
    loginPattern,
    messagePattern,
    namePattern,
    passwordPattern,
    phonePattern
} from "../utils/validators"
import { InputConstruct } from "./inputConstruct"
import { InputField } from "./inputField"

const getPasswordField = (
    name: string,
    labelText: string,
    required: boolean = true
): InputConstruct => {
    return new InputConstruct({
        props: {
            InputField: new InputField({
                events: {
                    focus: inputValidationCallback,
                    blur: inputValidationCallback
                },
                props: {
                    type: "password",
                    name,
                    required,
                    pattern: passwordPattern.source
                }
            }),
            label: {
                text: labelText
            },
            br: true
        }
    })
}

export const getMessageInput = (): InputConstruct[] => {
    // Возвращаю массив для единообразия
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "text",
                        name: "message",
                        required: true,
                        pattern: messagePattern.source
                    }
                }),
                label: {
                    text: "Сообщение"
                }
            }
        })
    ]
}

export const getLoginInputs = (): InputConstruct[] => {
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "text",
                        name: "login",
                        required: true,
                        pattern: loginPattern.source
                    }
                }),
                label: {
                    text: "Логин*"
                },
                br: true
            }
        }),
        getPasswordField("password", "Пароль*")
    ]
}

export const getRegisterInputs = (
    loadValues: boolean = false
): InputConstruct[] => {
    if (loadValues) {
        // Вот тут буду подгружать имеющиеся значения и прокидывать в форму
    }

    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "tel",
                        name: "phone",
                        required: true,
                        pattern: phonePattern.source
                    }
                }),
                label: {
                    text: loadValues ? "Телефон" : "Телефон*"
                },
                br: true
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "text",
                        name: "login",
                        required: true,
                        pattern: loginPattern.source
                    }
                }),
                label: {
                    text: loadValues ? "Логин" : "Логин*"
                },
                br: true
            }
        }),
        getPasswordField("password", "Пароль*"),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "text",
                        name: "first_name",
                        pattern: namePattern.source
                    }
                }),
                label: {
                    text: "Имя"
                },
                br: true
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "text",
                        name: "second_name",
                        pattern: namePattern.source
                    }
                }),
                label: {
                    text: "Фамилия"
                },
                br: true
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    events: {
                        focus: inputValidationCallback,
                        blur: inputValidationCallback
                    },
                    props: {
                        type: "email",
                        name: "email",
                        pattern: emailPattern.source
                    }
                }),
                label: {
                    text: "Email"
                },
                br: true
            }
        })
    ]
}

export const getSettingsInputs = (): InputConstruct[] => {
    const registerInputs = getRegisterInputs(true)

    // Удаляем имеющееся поле для пароля
    registerInputs.splice(2, 1)

    return [
        getPasswordField("oldPassword", "Текущий пароль*"),
        getPasswordField("newPassword", "Новый пароль", false)
    ].concat(registerInputs)
}
