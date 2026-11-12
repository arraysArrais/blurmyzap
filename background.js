// Chrome (service worker) precisa importar; no Firefox o defaults.js já vem
// carregado via "background.scripts" no manifest.
if (typeof importScripts === "function" && typeof BMZ_DEFAULTS === "undefined") {
  importScripts("defaults.js");
}

/* global BMZ_DEFAULTS */
const SIZES = [16, 32, 48, 128];

function iconPaths(enabled) {
  const suffix = enabled ? "" : "-off";
  return Object.fromEntries(SIZES.map((s) => [s, `icons/icon${s}${suffix}.png`]));
}

// Ícone verde = blur ligado; ícone cinza + "OFF" = blur desligado.
async function updateActionIcon(enabled) {
  await chrome.action.setIcon({ path: iconPaths(enabled) });
  await chrome.action.setBadgeText({ text: enabled ? "" : "OFF" });
  await chrome.action.setBadgeBackgroundColor({ color: "#667781" });
  await chrome.action.setTitle({ title: chrome.i18n.getMessage(enabled ? "statusOn" : "statusOff") });
}

async function syncIconWithStorage() {
  const { enabled } = await chrome.storage.sync.get({ enabled: BMZ_DEFAULTS.enabled });
  await updateActionIcon(enabled);
}

chrome.runtime.onInstalled.addListener(syncIconWithStorage);
chrome.runtime.onStartup.addListener(syncIconWithStorage);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "enabled" in changes) {
    updateActionIcon(changes.enabled.newValue);
  }
});

// Atalho de teclado: sem tecla padrão; o usuário define na tela de atalhos do navegador (link no popup).
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-blur") return;
  const { enabled } = await chrome.storage.sync.get({ enabled: BMZ_DEFAULTS.enabled });
  await chrome.storage.sync.set({ enabled: !enabled });
});
