import { isFormDataValid } from "../../utils/validators"

export function authSubmitBuilder(controllerMethod: Function) {
    return async (event: Event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        // Не вижу смысла в этой валидации, но раз в задании есть, добавил
        if (isFormDataValid(form)) {
            const data = new FormData(form)
            await controllerMethod(data)
            form.reset()
        }
    }
}
