// Configuração do web-ext (lint/build/run).
export default {
  // Arquivos que NÃO entram no pacote da extensão.
  ignoreFiles: ["store-assets", "README.md", "PRIVACY.md", "web-ext-config.mjs"],
  build: {
    // Nome fixo do zip, independente do nome (traduzido) da extensão.
    filename: "blurmyzap-{version}.zip",
  },
};
