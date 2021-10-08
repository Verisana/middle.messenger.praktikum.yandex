import { inputFieldNames } from "../consts"
import {
    emailPattern,
    errorMessages,
    inputValidationCallback,
    loginPattern,
    messagePattern,
    namePattern,
    passwordPattern,
    phonePattern
} from "../utils/validators"
import { InputConstruct } from "../components/inputConstruct"
import { IInputFieldProps, InputField } from "../components/inputField"

const getPasswordField = (
    name: string,
    labelText: string,
    required: boolean = true
): InputConstruct => {
    const props: IInputFieldProps = {
        events: {
            focus: [inputValidationCallback],
            keyup: [inputValidationCallback],
            blur: [inputValidationCallback]
        },
        type_: "password",
        name,
        pattern: passwordPattern.source
    }
    if (required) {
        props.required = required
    }
    return new InputConstruct({
        props: {
            InputField: new InputField({
                props
            }),
            label: {
                text: labelText
            },
            br: true,
            validationErrorText: errorMessages[name]
        }
    })
}

export const getMessageInput = (): InputConstruct[] => {
    // Возвращаю массив для единообразия
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "text",
                        name: inputFieldNames.message,
                        required: true,
                        pattern: messagePattern.source
                    }
                }),
                label: {
                    text: "Сообщение"
                },
                validationErrorText: errorMessages[inputFieldNames.message]
            }
        })
    ]
}

export const getLoginInputs = (): InputConstruct[] => {
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            blur: [inputValidationCallback],
                            keyup: [inputValidationCallback]
                        },
                        type_: "text",
                        name: inputFieldNames.login,
                        required: true,
                        pattern: loginPattern.source
                    }
                }),
                label: {
                    text: "Логин*"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.login]
            }
        }),
        getPasswordField(inputFieldNames.password, "Пароль*")
    ]
}

export const getRegisterInputs = (): InputConstruct[] => {
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    storeMappings: {
                        "user.phone": ["value"]
                    },
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "tel",
                        name: inputFieldNames.phone,
                        required: true,
                        pattern: phonePattern.source
                    }
                }),
                label: {
                    text: "Телефон*"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.phone]
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    storeMappings: {
                        "user.login": ["value"]
                    },
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "text",
                        name: inputFieldNames.login,
                        required: true,
                        pattern: loginPattern.source
                    }
                }),
                label: {
                    text: "Логин*"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.login]
            }
        }),
        getPasswordField("password", "Пароль*"),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    storeMappings: {
                        "user.first_name": ["value"]
                    },
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "text",
                        name: inputFieldNames.firstName,
                        pattern: namePattern.source
                    }
                }),
                label: {
                    text: "Имя"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.firstName]
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    storeMappings: {
                        "user.second_name": ["value"]
                    },
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "text",
                        name: inputFieldNames.secondName,
                        pattern: namePattern.source
                    }
                }),
                label: {
                    text: "Фамилия"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.secondName]
            }
        }),
        new InputConstruct({
            props: {
                InputField: new InputField({
                    storeMappings: {
                        "user.email": ["value"]
                    },
                    props: {
                        events: {
                            focus: [inputValidationCallback],
                            keyup: [inputValidationCallback],
                            blur: [inputValidationCallback]
                        },
                        type_: "email",
                        name: inputFieldNames.email,
                        pattern: emailPattern.source
                    }
                }),
                label: {
                    text: "Email"
                },
                br: true,
                validationErrorText: errorMessages[inputFieldNames.email]
            }
        })
    ]
}

export function getAvatarInput(): InputConstruct[] {
    return [
        new InputConstruct({
            props: {
                InputField: new InputField({
                    props: {
                        type_: "file",
                        name: inputFieldNames.avatar,
                        required: true,
                        accept: "image/*"
                    }
                }),
                label: {
                    text: "Avatar"
                }
            }
        })
    ]
}
}

export const getSettingsInputs = (): InputConstruct[] => {
    const registerInputs = getRegisterInputs()

    // Удаляем имеющееся поле для пароля
    registerInputs.splice(2, 1)

    return [
        getPasswordField(inputFieldNames.oldPassword, "Текущий пароль*"),
        getPasswordField(inputFieldNames.newPassword, "Новый пароль", false)
    ].concat(registerInputs)
}
