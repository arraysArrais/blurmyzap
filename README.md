# BlurMyZap

**English** · [Português](#português)

Browser extension that blurs your WhatsApp Web chats so nobody can read over your shoulder. Hover to reveal.

Works on **Google Chrome** (and other Chromium browsers) and **Mozilla Firefox**.

## Features

- Blur the chat list, profile pictures, chat header, messages, photos/videos, the entire conversation and/or the message input — each one can be toggled on or off
- Reveal on hover: see only what you point at
- Adjustable blur intensity
- Toggle the blur on/off with a keyboard shortcut of your choice (set it from the popup)
- Toolbar icon shows whether the blur is on or off
- Available in English and Portuguese (follows the browser language)

## Privacy

BlurMyZap collects **no data**. Everything runs locally in your browser, settings are kept in the browser's own storage, and the extension only runs on `web.whatsapp.com`.

## Installing for development

**Chrome**

1. Go to `chrome://extensions` and turn on **Developer mode**
2. Click **Load unpacked** and select this folder

**Firefox**

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…** and select `manifest.json`

Or run `npx web-ext run` from this folder.

## Building

```sh
npx web-ext lint                    # validate
npx web-ext build --overwrite-dest  # creates web-ext-artifacts/blurmyzap-<version>.zip
```

The same zip is used for both the Chrome Web Store and addons.mozilla.org.

## Project structure

| File | Purpose |
|---|---|
| `manifest.json` | Extension manifest (Chrome + Firefox) |
| `defaults.js` | Default settings shared by all scripts |
| `content.js` / `content.css` | Applies the blur on WhatsApp Web |
| `background.js` | Toolbar icon state and keyboard shortcut |
| `popup.html` / `popup.js` / `popup.css` | Settings popup |
| `_locales/` | Translations (`en` is the default, `pt_BR`) |

To add a language, create `_locales/<code>/messages.json` with the same keys as `_locales/en/messages.json`.

---

## Português

Extensão de navegador que aplica blur nas conversas do WhatsApp Web para ninguém ficar xeretando. Passe o mouse para revelar.

Funciona no **Google Chrome** (e outros navegadores Chromium) e no **Mozilla Firefox**.

### Recursos

- Blur na lista de conversas, fotos de perfil, cabeçalho da conversa, mensagens, imagens/vídeos, conversa inteira e/ou campo de digitação — cada um pode ser ligado ou desligado
- Revelar ao passar o mouse: veja só o que você apontar
- Intensidade do blur ajustável
- Liga/desliga com um atalho de teclado à sua escolha (defina pelo popup)
- O ícone na barra mostra se o blur está ligado ou desligado
- Disponível em inglês e português (segue o idioma do navegador)

### Privacidade

O BlurMyZap **não coleta nenhum dado**. Tudo roda localmente no navegador, as preferências ficam no armazenamento do próprio navegador e a extensão só roda em `web.whatsapp.com`.

### Instalação para desenvolvimento e build

Veja as seções [Installing for development](#installing-for-development) e [Building](#building) acima — os passos são os mesmos.

---

BlurMyZap is an independent project and is not affiliated with WhatsApp or Meta.

O BlurMyZap é um projeto independente e não tem relação com o WhatsApp ou a Meta.

## License

Copyright (C) 2026 [arraysArrais](https://github.com/arraysArrais)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [GNU General Public License](LICENSE) for more details.
