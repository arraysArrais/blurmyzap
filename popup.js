/* global BMZ_DEFAULTS, BMZ_SECTIONS */

// Textos traduzidos (_locales/<idioma>/messages.json), no idioma do navegador.
document.documentElement.lang = chrome.i18n.getUILanguage();
for (const el of document.querySelectorAll("[data-i18n]")) {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
}

// Mostra o atalho realmente configurado (o usuário pode trocar nas configurações do navegador).
const shortcutKeys = document.getElementById("shortcutKeys");
chrome.commands.getAll((commands) => {
  const cmd = commands.find((c) => c.name === "toggle-blur");
  if (!cmd || !cmd.shortcut) {
    shortcutKeys.textContent = chrome.i18n.getMessage("shortcutNotSet");
    document.getElementById("shortcutChange").textContent = chrome.i18n.getMessage("shortcutSet");
    return;
  }
  // Chrome no Windows/Linux devolve "Alt+Shift+Z"; no Mac, símbolos como "⌥⇧Z".
  const keys = cmd.shortcut.includes("+") ? cmd.shortcut.split("+") : [...cmd.shortcut];
  keys.forEach((key, i) => {
    if (i > 0) shortcutKeys.append("+");
    const kbd = document.createElement("kbd");
    kbd.textContent = key;
    shortcutKeys.append(kbd);
  });
});

// Abre a tela de atalhos do navegador (Firefox tem API própria; Chrome usa a página interna).
document.getElementById("shortcutChange").addEventListener("click", (e) => {
  e.preventDefault();
  if (chrome.commands.openShortcutSettings) {
    chrome.commands.openShortcutSettings();
  } else {
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  }
  window.close();
});

const checkboxKeys = ["enabled", "revealOnHover", ...BMZ_SECTIONS];
const options = document.getElementById("options");
const intensity = document.getElementById("intensity");
const intensityValue = document.getElementById("intensityValue");

function render(settings) {
  for (const key of checkboxKeys) {
    document.getElementById(key).checked = Boolean(settings[key]);
  }
  intensity.value = settings.intensity;
  intensityValue.textContent = settings.intensity;
  options.disabled = !settings.enabled;
}

chrome.storage.sync.get(BMZ_DEFAULTS, render);

for (const key of checkboxKeys) {
  document.getElementById(key).addEventListener("change", (e) => {
    chrome.storage.sync.set({ [key]: e.target.checked });
    if (key === "enabled") options.disabled = !e.target.checked;
  });
}

intensity.addEventListener("input", () => {
  const value = Number(intensity.value);
  intensityValue.textContent = value;
  chrome.storage.sync.set({ intensity: value });
});
