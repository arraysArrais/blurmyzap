/* global BMZ_DEFAULTS, BMZ_SECTIONS */
(() => {
  const root = document.documentElement;

  function apply(settings) {
    root.classList.toggle("bmz-on", settings.enabled);
    root.classList.toggle("bmz-hover", settings.revealOnHover);
    for (const section of BMZ_SECTIONS) {
      root.classList.toggle(`bmz-${section}`, Boolean(settings[section]));
    }
    root.style.setProperty("--bmz-blur", `${settings.intensity}px`);
  }

  // Aplica os padrões imediatamente (document_start) para evitar "flash" do conteúdo.
  apply(BMZ_DEFAULTS);

  chrome.storage.sync.get(BMZ_DEFAULTS, apply);

  chrome.storage.onChanged.addListener((_changes, area) => {
    if (area === "sync") chrome.storage.sync.get(BMZ_DEFAULTS, apply);
  });
})();
