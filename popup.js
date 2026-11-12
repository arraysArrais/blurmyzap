/* global BMZ_DEFAULTS, BMZ_SECTIONS */

// Textos traduzidos (_locales/<idioma>/messages.json), no idioma do navegador.
document.documentElement.lang = chrome.i18n.getUILanguage();
for (const el of document.querySelectorAll("[data-i18n]")) {
  el.textContent = chrome.i18n.getMessage(el.dataset.i18n);
}

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
