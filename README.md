# Random Voice Chat

[Pull request из `sprint_1`](https://github.com/Verisana/middle.messenger.praktikum.yandex/pull/3)

[Сайт на Netlify](https://pedantic-bhaskara-cd46dc.netlify.app/)

## Установка

Для работы вам нужно установить `node.js >=14.17`. Сделать можно, например, [по инструкции NVM](https://github.com/nvm-sh/nvm).

Далее, следуйте командам:

```bash
git clone https://github.com/Verisana/middle.messenger.praktikum.yandex.git
cd middle.messenger.praktikum.yandex
npm install
```

## Для старта

- `npm run dev` - запуск `dev` версии
- `npm run build` - собрать проект
- `npm run start` - раздача статики через `Express`

## Уточнения

1. [Макет проекта в Figma](https://www.figma.com/file/tZvytX2jR7z7Izp4tqxaqH/Praktikum-Messenger?node-id=3%3A18)
2. Я практически не использовал элементы `partials` и `helpers` в этой работе в связи с тем, что не нашел какого-либо интересного применения этим возможностям. Вместо них у меня стоят `div placeholder`, куда я уже прокидываю нужный мне элемент.
3. Пока у меня нет глобального состояния приложения, параметр `isLogged` лежит в константах и переключается вручную в зависимости от того, что мы тестируем.
4. В проекте я держал идею того, что в конечном итоге хочу сделать голосовой чат со случайными собеседниками. Но в текущей реализации от этой идеи ничего нет. С версткой очень долго возился, так как опыта в этом мало.
5. Страницу `home` пока не сверстал до конца, так как в задании написали, что нужно лишь заглушку поставить.