# Random Voice Chat

[Pull request из `sprint_3`](https://github.com/Verisana/middle.messenger.praktikum.yandex/pull/11)

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
- `npm run test` - запуск тестов проекта
- `npm run build` - собрать проект. Перед сборкой код пропускается через TypeScript компилятор, ESlint и StyleLint. И только в случае успешного прохождения код собирается.
- `npm run start` - раздача статики через `Express`
- `npm run lint` - код проверяется через prettier fix, ESlint и StyleLint
- `npm run compile` - проверить код TypeScript компилятором

## Уточнения

1. [Макет проекта в Figma](https://www.figma.com/file/tZvytX2jR7z7Izp4tqxaqH/Praktikum-Messenger?node-id=3%3A18)
2. Код получился немного запутанным с этими событиями, пропсами и навешиванием логики в контроллеры
3. Верстку не успел доделать. Завершу окончательно к 4 спринту. Сейчас просто поставил кнопки, поля, чтобы они работали