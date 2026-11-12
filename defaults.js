// Configurações padrão compartilhadas entre content script, popup e background.
// eslint-disable-next-line no-unused-vars
const BMZ_DEFAULTS = {
  enabled: true,
  revealOnHover: true,
  intensity: 6, // px
  chatList: true, // lista de conversas (nomes + última mensagem)
  avatars: true, // fotos de perfil
  chatHeader: true, // nome/foto no topo da conversa aberta
  messages: true, // balões de mensagem
  media: true, // imagens, vídeos e figurinhas
  conversation: false, // área inteira da conversa aberta (um bloco só)
  composer: false // campo de digitação
};

const BMZ_SECTIONS = ["chatList", "avatars", "chatHeader", "messages", "media", "conversation", "composer"];
