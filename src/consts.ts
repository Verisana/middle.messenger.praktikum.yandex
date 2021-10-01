// В контакт листе на каком знаке обрубать сообщения
export const maxMessageLength = 64

export const rootQuery = "#App"

export const defaultAvatar = "default-avatar.png"

// Пока у нас нет глобального состояния, решил сюда для эмуляции прописывать
// нужные параметры по авторизации. Можно менять, чтобы посмотреть, как
// меняется контент в зависимости от положения переключателя
export const isLogged = false

export const inputFieldNames = {
    firstName: "first_name",
    secondName: "second_name",
    login: "login",
    password: "password",
    oldPassword: "oldPassword",
    newPassword: "newPassword",
    phone: "phone",
    email: "email",
    message: "message"
}
