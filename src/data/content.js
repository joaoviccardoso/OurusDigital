// Todo o texto das seções fica aqui. Para editar copy, mexa só neste arquivo.

export const STEPS = [
  { n: 1, title: 'Aproximação', text: 'Seu cliente aproxima o celular da placa (NFC) ou escaneia o QR code.' },
  { n: 2, title: 'Abertura Instantânea', text: 'O link do Google Reviews é aberto automaticamente no celular.' },
  { n: 3, title: 'Avaliação Registrada', text: 'Em poucos segundos, ele deixa a sua avaliação e pronto.' },
];

export const MODELS = [
  { variant: 'blue', name: 'Modelo Azul', text: 'Moderno, chamativo e tecnológico. Ideal para se destacar e atrair mais avaliações.' },
  { variant: 'black', name: 'Modelo Preta', text: 'Elegante, discreto e premium. Perfeito para ambientes mais sofisticados.' },
];

export const SOLUTIONS = [
  { title: 'Mais avaliações, mais clientes', tag: 'Reputação', img: '/images/solucao-avaliacoes.png',
    text: 'Facilite o caminho para que seus clientes avaliem sua empresa e ajude a construir uma reputação que gera confiança.' },
  { title: 'Mais avaliações no Google', tag: 'Visibilidade', img: '/images/solucao-google.png',
    text: 'Estratégias de presença digital para ajudar sua empresa a ganhar destaque nas buscas e ser encontrada por novos clientes.' },
  { title: 'Sites que valorizam sua marca', tag: 'Desenvolvimento web', img: '/images/solucao-site.png',
    text: 'Sites modernos, responsivos e pensados para apresentar seus serviços, transmitir confiança e gerar oportunidades.' },
  { title: 'Gestão do Google Business', tag: 'Presença local', img: '/images/solucao-business.png',
    text: 'Mantenha o perfil da sua empresa atualizado e fácil de ser descoberto por quem procura seus serviços.' },
  { title: 'Placas NFC & QR Code Premium', tag: 'Produto em destaque', img: '/images/solucao-placas.png',
    text: 'Conecte o atendimento presencial ao digital com placas elegantes que facilitam o acesso às avaliações e geram confiança.' },
];

export const BENEFITS = [
  {
    icon: '/images/IconEstrela.png',
    title: 'Mais avaliações, *mais clientes*',
    text: 'Facilite o caminho para seus clientes avaliarem sua empresa e ajude a construir uma reputação que gera confiança.',
    image: '/images/ImgMaisAva.jpeg',
    imageAlt: 'Perfil da empresa no Google com nota 4,9',
  },
  {
    icon: '/images/iconeGrafico.png',
    title: 'Mais *avaliações* no Google',
    text: 'Estratégias de presença digital para ajudar sua empresa a ganhar destaque nas buscas e ser encontrada por novos clientes.',
    image: '/images/MaisGoogle.jpeg',
    imageAlt: 'Busca no Google com a empresa em destaque',
  },
  {
    icon: '/images/iconeCodigo.png',
    title: 'Sites que *valorizam sua marca*',
    text: 'Sites modernos, responsivos e pensados para apresentar seus serviços, transmitir confiança e gerar oportunidades.',
    image: '/images/SitesImg.jpeg',
    imageAlt: 'Site institucional em notebook e celular',
  },
  {
    icon: '/images/iconeGrafico.png',
    title: 'Gestão *do Google Business*',
    text: 'Mantenha o perfil da sua empresa atualizado e facilite a descoberta do seu negócio por quem procura seus serviços.',
    image: '/images/GestaoDeGoogle.png',
    imageAlt: 'Painel do Google Business',
  },
  {
    icon: '/images/iconePlaca.png',
    title: 'Placas *NFC & QR Code Premium*',
    text: 'Conecte o atendimento presencial ao digital com placas elegantes que facilitam o acesso dos clientes às suas avaliações e canais online.',
    image: '/images/PlacasNFC.png',
    imageAlt: 'Placas NFC e QR Code azul e preta',
  },
];

// Cada array interno = um slide do carrossel (3 cards empilhados).
// `icon` é opcional (caminho de imagem), igual ao BENEFITS.
export const INFO_SLIDES = [
  [
    {
      title: 'Destaque onde seus clientes procuram.',
      text: 'Estratégias de SEO local e otimização do Perfil da Empresa no Google ajudam seu negócio a ganhar visibilidade quando as pessoas procuram pelos serviços que você oferece',
    },
    {
      title: 'Seu site trabalhando pela sua empresa.',
      text: 'Tenha uma página rápida, responsiva e alinhada à sua marca, preparada para apresentar seus diferenciais, conquistar a confiança dos visitantes e incentivar contatos.',
    },
    {
      title: 'Sua reputação merece ser vista.',
      text: 'Facilite o acesso às avaliações e crie uma experiência simples para seus clientes compartilharem suas opiniões espontaneamente, fortalecendo sua reputação online.',
    },
  ],
  [
    {
      title: 'Mais confiança',
      text: 'Uma presença profissional transmite credibilidade antes mesmo do primeiro contato. Fortaleça a imagem da sua empresa e facilite a decisão de novos clientes.',
    },
    {
      title: 'Soluções conectadas ao seu crescimento.',
      text: 'Site, presença no Google, reputação e tecnologia trabalhando em conjunto para criar uma experiência consistente e profissional em cada ponto de contato com seus clientes.',
    },
    {
      title: 'Tecnologia premium. Experiência diferenciada.',
      text: 'Muito além de uma placa comum: acrílico com acabamento sofisticado, NFC e QR Code em uma solução que aproxima o ambiente físico dos seus canais digitais.',
    },
  ],
];
