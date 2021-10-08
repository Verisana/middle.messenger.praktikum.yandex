// В контакт листе на каком знаке обрубать сообщения
export const maxMessageLength = 64

export const rootQuery = "#App"

export const defaultAvatar = "default-avatar.png"

export const inputFieldNames = {
    firstName: "first_name",
    secondName: "second_name",
    login: "login",
    password: "password",
    oldPassword: "oldPassword",
    newPassword: "newPassword",
    phone: "phone",
    email: "email",
    message: "message",
    avatar: "avatar"
}

export const urlSlugs = {
    home: "/",
    register: "/sign-up",
    settings: "/settings",
    messenger: "/messenger",
    login: "/login",
    error: "/404",
    serverError: "/500"
}

export const backendUrl = "https://ya-praktikum.tech/api/v2"

export const backendStaticUrl = "https://ya-praktikum.tech/api/v2/resources"

export const BlockEvents = {
    INIT: "init",
    STATE_SDU: "state:state-did-update",
    FLOW_CBM: "flow:component-before-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update"
}
