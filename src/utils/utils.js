export const string2DomElement = (toParse) => {
    if (typeof toParse !== "string") {
        throw new Error("Argument must be string")
    }
    const parsed = new DOMParser().parseFromString(toParse, "text/html")
    return parsed.body.firstChild
}

// Преобразуем список со стилями в строку для проброса в шаблон
export const convertStyles2Strings = (classMappings, classList) => {
    return classList === undefined
        ? ""
        : classList
              .map((el) => {
                  const mapping = classMappings[el]
                  if (mapping === undefined)
                      throw new Error(
                          `Can not map class to converted style class. Check arguments`
                      )
                  return mapping
              })
              .reduce((acc, classValue) => acc + ` ${classValue}`)
}

// Заглушка, которая вызывается во всех сабмитах, чтобы показать
// работоспособность
export const onSubmitMock = (event) => {
    event.preventDefault()
    console.log("Form submitted!")
}
