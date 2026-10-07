/**
 * Single registry for every calculator route.
 * Sitemap entries, navigation, and related links are derived from this list.
 */

export const SITE_URL = 'https://calculadora-digital.com.br';

export type CalculatorCategory = 'ferramentas' | 'financas' | 'trabalho' | 'saude' | 'impostos';

export type AdTopic = 'finance' | 'labor' | 'tax' | 'other';

export type DesktopGroup = 'calculadoras' | 'trabalho' | 'financas';

export type MobileGroup = 'populares' | 'basicas' | 'trabalho' | 'financas' | 'ferramentas';

export type FooterGroup = 'populares' | 'financas' | 'trabalho' | 'basicas';

export type ChangeFrequency = 'weekly' | 'monthly';

export interface HomeCard {
  title: string;
  description: string;
  emoji: string;
  className: string;
  withYear?: boolean;
}

export interface CalculatorEntry {
  slug: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  /** Higher AdSense-value topics used as a scoring weight, not a measured RPM. */
  adTopic: AdTopic;
  related: string[];
  /** Unpublished placeholders stay out of the sitemap and navigation. */
  published: boolean;
  sitemapPriority: number;
  changeFrequency: ChangeFrequency;
  sitemapOrder: number;
  desktopGroup: DesktopGroup | null;
  desktopLabel: string | null;
  desktopOrder: number;
  mobileGroup: MobileGroup | null;
  mobileLabel: string | null;
  mobileOrder: number;
  mobileWithYear?: boolean;
  footerGroup: FooterGroup | null;
  footerLabel: string | null;
  footerOrder: number;
  footerWithYear?: boolean;
  home?: HomeCard;
  homeOrder?: number;
  /** Short phrase used by the related-calculators block. */
  linkLabel: string;
}

export const CALCULATORS: readonly CalculatorEntry[] = [
  {
    slug: 'calculadora-cientifica',
    title: 'Calculadora Científica',
    description: 'Use a calculadora científica online grátis para seno, cosseno, tangente, raiz, potência, logaritmo e operações avançadas.',
    category: 'ferramentas',
    adTopic: 'other',
    related: ['calculadora-porcentagem', 'calculadora-de-horas', 'gerador-senha'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 10,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora Científica',
    desktopOrder: 10,
    mobileGroup: 'basicas',
    mobileLabel: '🔬 Científica',
    mobileOrder: 10,
    footerGroup: 'basicas',
    footerLabel: '🔬 Científica',
    footerOrder: 20,
    home: {
      title: 'Calculadora científica online',
      description: 'Funções avançadas: seno, logaritmo e mais',
      emoji: '🔬',
      className: 'bg-indigo-50 hover:bg-indigo-100',
    },
    homeOrder: 10,
    linkLabel: 'calculadora científica',
  },
  {
    slug: 'calculadora-porcentagem',
    title: 'Calculadora de Porcentagem',
    description: 'Calcule porcentagem online grátis: desconto, aumento, quanto é X% de um valor e porcentagem entre dois números. Rápida e fácil.',
    category: 'ferramentas',
    adTopic: 'other',
    related: ['calculadora-cientifica', 'juros-compostos', 'calculadora-salario-liquido'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 20,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de Porcentagem',
    desktopOrder: 20,
    mobileGroup: 'basicas',
    mobileLabel: '% Porcentagem',
    mobileOrder: 20,
    footerGroup: 'basicas',
    footerLabel: '% Porcentagem',
    footerOrder: 30,
    home: {
      title: 'Calculadora de porcentagem',
      description: 'Desconto, aumento e proporções',
      emoji: '%',
      className: 'bg-orange-50 hover:bg-orange-100',
    },
    homeOrder: 20,
    linkLabel: 'calculadora de porcentagem',
  },
  {
    slug: 'calculadora-de-horas',
    title: 'Calculadora de Horas',
    description: 'Calculadora de horas online grátis. Some, subtraia horas, calcule duração entre horários e some listas de tempo. Ideal para folha de ponto e trabalho.',
    category: 'ferramentas',
    adTopic: 'labor',
    related: ['calculadora-hora-extra', 'calculadora-salario-liquido'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 30,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de Horas',
    desktopOrder: 30,
    mobileGroup: 'populares',
    mobileLabel: '⏱️ Calculadora de Horas',
    mobileOrder: 40,
    footerGroup: 'basicas',
    footerLabel: '⏱️ Horas',
    footerOrder: 40,
    home: {
      title: 'Calculadora de horas',
      description: 'Somar, subtrair e calcular tempo',
      emoji: '⏱️',
      className: 'bg-teal-50 hover:bg-teal-100',
    },
    homeOrder: 30,
    linkLabel: 'calculadora de horas',
  },
  {
    slug: 'calculo-financiamento-imobiliario',
    title: 'Financiamento Imobiliário',
    description: 'Simule financiamento imobiliário online. Calcule prestações, juros, seguro e planeje a compra da sua casa.',
    category: 'financas',
    adTopic: 'finance',
    related: ['calculadora-financiamento-veiculo', 'juros-compostos', 'calculadora-consorcio'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 40,
    desktopGroup: 'financas',
    desktopLabel: 'Financiamento imobiliário',
    desktopOrder: 10,
    mobileGroup: 'financas',
    mobileLabel: '🏠 Financiamento imóvel',
    mobileOrder: 20,
    footerGroup: 'financas',
    footerLabel: 'Financiamento Imobiliário',
    footerOrder: 20,
    linkLabel: 'calculadora de financiamento imobiliário',
  },
  {
    slug: 'juros-compostos',
    title: 'Juros Compostos',
    description: 'Calcule juros compostos online grátis. Simule investimentos, empréstimos e veja quanto seu dinheiro rende ao longo do tempo.',
    category: 'financas',
    adTopic: 'finance',
    related: ['calculadora-cdb-cdi', 'calculo-financiamento-imobiliario', 'calculo-payback'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 50,
    desktopGroup: 'financas',
    desktopLabel: 'Juros Compostos',
    desktopOrder: 60,
    mobileGroup: 'financas',
    mobileLabel: '📈 Juros Compostos',
    mobileOrder: 10,
    footerGroup: 'financas',
    footerLabel: 'Juros Compostos',
    footerOrder: 10,
    home: {
      title: 'Calculadora de Juros Compostos',
      description: 'Simule investimentos e rendimentos',
      emoji: '📈',
      className: 'bg-purple-50 hover:bg-purple-100',
    },
    homeOrder: 60,
    linkLabel: 'calculadora de juros compostos',
  },
  {
    slug: 'calculo-payback',
    title: 'Cálculo de Payback',
    description: 'Calcule o payback do seu investimento online. Descubra em quanto tempo recupera o capital com payback simples e descontado.',
    category: 'financas',
    adTopic: 'finance',
    related: ['juros-compostos', 'calculadora-cdb-cdi'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 60,
    desktopGroup: 'financas',
    desktopLabel: 'Cálculo de Payback',
    desktopOrder: 70,
    mobileGroup: 'financas',
    mobileLabel: '💰 Payback',
    mobileOrder: 70,
    footerGroup: 'financas',
    footerLabel: 'Payback',
    footerOrder: 70,
    linkLabel: 'calculadora de payback',
  },
  {
    slug: 'gerador-senha',
    title: 'Gerador de Senha',
    description: 'Gere senhas fortes e seguras online. Personalize comprimento e caracteres. Ferramenta gratuita, sem cadastro.',
    category: 'ferramentas',
    adTopic: 'other',
    related: ['calculadora-cientifica'],
    published: true,
    sitemapPriority: 0.8,
    changeFrequency: 'weekly',
    sitemapOrder: 70,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Gerador de Senha',
    desktopOrder: 80,
    mobileGroup: 'ferramentas',
    mobileLabel: '🔐 Gerador de Senha',
    mobileOrder: 10,
    footerGroup: 'basicas',
    footerLabel: '🔐 Gerador de Senha',
    footerOrder: 50,
    linkLabel: 'gerador de senha',
  },
  {
    slug: 'calculadora-imposto-renda',
    title: 'Calculadora de Imposto de Renda',
    description: 'Calculadora de Imposto de Renda online e gratuita. Calcule quanto você deve pagar de IR, simule restituição e descubra se está isento.',
    category: 'impostos',
    adTopic: 'tax',
    related: ['calculadora-salario-liquido', 'calculadora-fgts', 'calculadora-13-ferias'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 80,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de IR',
    desktopOrder: 40,
    mobileGroup: 'populares',
    mobileLabel: '📊 Imposto de Renda',
    mobileOrder: 10,
    mobileWithYear: true,
    footerGroup: 'populares',
    footerLabel: '📊 Imposto de Renda',
    footerOrder: 10,
    footerWithYear: true,
    linkLabel: 'calculadora de imposto de renda',
  },
  {
    slug: 'calculadora-imc',
    title: 'Calculadora de IMC',
    description: 'Calculadora de IMC gratuita e precisa. Calcule seu Índice de Massa Corporal, descubra se está no peso ideal e receba dicas personalizadas de saúde.',
    category: 'saude',
    adTopic: 'other',
    related: ['calculadora-calorias'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 90,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de IMC',
    desktopOrder: 50,
    mobileGroup: 'populares',
    mobileLabel: '⚖️ Calculadora de IMC',
    mobileOrder: 20,
    footerGroup: 'populares',
    footerLabel: '⚖️ Calculadora IMC',
    footerOrder: 20,
    home: {
      title: 'Calculadora de IMC',
      description: 'Avalie seu peso ideal e saúde',
      emoji: '⚖️',
      className: 'bg-green-50 hover:bg-green-100',
    },
    homeOrder: 70,
    linkLabel: 'calculadora de IMC',
  },
  {
    slug: 'calculadora-aposentadoria',
    title: 'Calculadora de Aposentadoria',
    description: 'Simule sua aposentadoria pelo INSS e previdência privada. Calcule benefícios, tempo de contribuição e planejamento financeiro.',
    category: 'financas',
    adTopic: 'finance',
    related: ['juros-compostos', 'calculadora-fgts'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 100,
    desktopGroup: 'financas',
    desktopLabel: 'Aposentadoria',
    desktopOrder: 80,
    mobileGroup: 'populares',
    mobileLabel: '🏛️ Aposentadoria',
    mobileOrder: 50,
    footerGroup: 'financas',
    footerLabel: 'Aposentadoria',
    footerOrder: 80,
    linkLabel: 'calculadora de aposentadoria',
  },
  {
    slug: 'calculadora-fgts',
    title: 'Calculadora de FGTS',
    description: 'Calcule saldo, saque, multa de 40%, rendimentos e cenários de demissão do FGTS.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-rescisao-trabalhista', 'calculadora-salario-liquido'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 110,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de FGTS',
    desktopOrder: 60,
    mobileGroup: 'populares',
    mobileLabel: '🏦 FGTS',
    mobileOrder: 30,
    mobileWithYear: true,
    footerGroup: 'populares',
    footerLabel: '🏦 FGTS',
    footerOrder: 30,
    footerWithYear: true,
    home: {
      title: 'Calculadora FGTS',
      description: 'Simule saldo e saques do FGTS',
      emoji: '🏦',
      className: 'bg-yellow-50 hover:bg-yellow-100',
      withYear: true,
    },
    homeOrder: 50,
    linkLabel: 'calculadora de FGTS',
  },
  {
    slug: 'calculadora-calorias',
    title: 'Calculadora de Calorias',
    description: 'Calcule suas calorias diárias, TMB e TDEE online. Descubra quanto comer para emagrecer, ganhar massa ou manter o peso.',
    category: 'saude',
    adTopic: 'other',
    related: ['calculadora-imc'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 120,
    desktopGroup: 'calculadoras',
    desktopLabel: 'Calculadora de Calorias',
    desktopOrder: 70,
    mobileGroup: 'populares',
    mobileLabel: '🍎 Calorias & Dieta',
    mobileOrder: 60,
    footerGroup: 'populares',
    footerLabel: '🍎 Calorias & Dieta',
    footerOrder: 40,
    linkLabel: 'calculadora de calorias',
  },
  {
    slug: 'calculadora-salario-liquido',
    title: 'Salário Líquido',
    description: 'Calcule seu salário líquido com INSS progressivo, IRRF e vale-transporte. Tabelas atualizadas e exemplos para R$2.000, R$3.000, R$5.000 e R$10.000.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-hora-extra', 'calculadora-13-ferias', 'calculadora-vale-transporte'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 130,
    desktopGroup: 'trabalho',
    desktopLabel: 'Salário líquido (CLT)',
    desktopOrder: 10,
    mobileGroup: 'trabalho',
    mobileLabel: '💼 Salário líquido',
    mobileOrder: 10,
    footerGroup: 'trabalho',
    footerLabel: 'Salário Líquido',
    footerOrder: 10,
    home: {
      title: 'Calculadora de Salário Líquido',
      description: 'INSS, IRRF e vale-transporte',
      emoji: '💼',
      className: 'bg-cyan-50 hover:bg-cyan-100',
    },
    homeOrder: 40,
    linkLabel: 'calculadora de salário líquido',
  },
  {
    slug: 'calculadora-rescisao-trabalhista',
    title: 'Rescisão Trabalhista',
    description: 'Estime verbas rescisórias: saldo de salário, 13º e férias proporcionais, aviso prévio e multa de 40% do FGTS em dispensa sem justa causa.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-fgts', 'calculadora-salario-liquido'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 140,
    desktopGroup: 'trabalho',
    desktopLabel: 'Rescisão trabalhista',
    desktopOrder: 20,
    mobileGroup: 'trabalho',
    mobileLabel: '📄 Rescisão trabalhista',
    mobileOrder: 20,
    footerGroup: 'trabalho',
    footerLabel: 'Rescisão',
    footerOrder: 20,
    linkLabel: 'calculadora de rescisão',
  },
  {
    slug: 'calculadora-13-ferias',
    title: '13º e Férias',
    description: 'Calcule 13º salário proporcional e férias com terço constitucional. Opcional: abono pecuniário (venda de 1/3 das férias).',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-salario-liquido', 'calculadora-hora-extra'],
    published: true,
    sitemapPriority: 0.9,
    changeFrequency: 'weekly',
    sitemapOrder: 150,
    desktopGroup: 'trabalho',
    desktopLabel: '13º e férias',
    desktopOrder: 30,
    mobileGroup: 'trabalho',
    mobileLabel: '📆 13º e férias',
    mobileOrder: 30,
    footerGroup: 'trabalho',
    footerLabel: '13º e Férias',
    footerOrder: 30,
    linkLabel: 'calculadora de 13º e férias',
  },
  {
    slug: 'calculadora-das-mei',
    title: 'DAS MEI',
    description: 'Estime o valor mensal do DAS do MEI (INSS 5% do salário mínimo + ICMS ou ISS fixos) para comércio, serviços ou atividade mista.',
    category: 'impostos',
    adTopic: 'tax',
    related: ['calculadora-salario-liquido', 'calculadora-imposto-renda'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 160,
    desktopGroup: 'trabalho',
    desktopLabel: 'DAS MEI',
    desktopOrder: 60,
    mobileGroup: 'trabalho',
    mobileLabel: '🧾 DAS MEI',
    mobileOrder: 60,
    footerGroup: 'trabalho',
    footerLabel: 'DAS MEI',
    footerOrder: 60,
    linkLabel: 'calculadora do DAS MEI',
  },
  {
    slug: 'calculadora-financiamento-veiculo',
    title: 'Financiamento de Veículo',
    description: 'Simule financiamento de carro ou moto: entrada, taxa, prazo e sistema SAC ou Price. Veja parcelas e juros totais aproximados.',
    category: 'financas',
    adTopic: 'finance',
    related: ['calculo-financiamento-imobiliario', 'calculadora-consorcio', 'calculadora-cartao-credito'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 170,
    desktopGroup: 'financas',
    desktopLabel: 'Financiamento de veículo',
    desktopOrder: 20,
    mobileGroup: 'financas',
    mobileLabel: '🚗 Financiamento veículo',
    mobileOrder: 30,
    footerGroup: 'financas',
    footerLabel: 'Financiamento Veículo',
    footerOrder: 30,
    linkLabel: 'calculadora de financiamento de veículo',
  },
  {
    slug: 'calculadora-consorcio',
    title: 'Consórcio',
    description: 'Estime parcela média e custo total de um consórcio com taxa de administração, fundo de reserva e seguro opcional.',
    category: 'financas',
    adTopic: 'finance',
    related: ['calculadora-financiamento-veiculo', 'calculo-financiamento-imobiliario'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 180,
    desktopGroup: 'financas',
    desktopLabel: 'Consórcio',
    desktopOrder: 30,
    mobileGroup: 'financas',
    mobileLabel: '🤝 Consórcio',
    mobileOrder: 40,
    footerGroup: 'financas',
    footerLabel: 'Consórcio',
    footerOrder: 40,
    linkLabel: 'calculadora de consórcio',
  },
  {
    slug: 'calculadora-cdb-cdi',
    title: 'CDB / CDI',
    description: 'Projeta rendimento de CDB atrelado ao CDI com percentual do CDI, prazo e IR sobre o ganho. Simulação com capitalização mensal.',
    category: 'financas',
    adTopic: 'finance',
    related: ['juros-compostos', 'calculo-financiamento-imobiliario'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 190,
    desktopGroup: 'financas',
    desktopLabel: 'CDB / CDI',
    desktopOrder: 40,
    mobileGroup: 'financas',
    mobileLabel: '📊 CDB / CDI',
    mobileOrder: 50,
    footerGroup: 'financas',
    footerLabel: 'CDB / CDI',
    footerOrder: 50,
    linkLabel: 'calculadora de CDB / CDI',
  },
  {
    slug: 'calculadora-cartao-credito',
    title: 'Cartão de Crédito',
    description: 'Veja uma simulação educativa do custo do crédito rotativo ao pagar o mínimo da fatura com juros mensais.',
    category: 'financas',
    adTopic: 'finance',
    related: ['juros-compostos', 'calculadora-cdb-cdi'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 200,
    desktopGroup: 'financas',
    desktopLabel: 'Cartão de crédito',
    desktopOrder: 50,
    mobileGroup: 'financas',
    mobileLabel: '💳 Cartão de crédito',
    mobileOrder: 60,
    footerGroup: 'financas',
    footerLabel: 'Cartão de Crédito',
    footerOrder: 60,
    linkLabel: 'calculadora de cartão de crédito',
  },
  {
    slug: 'calculadora-hora-extra',
    title: 'Horas Extras',
    description: 'Estime pagamento de horas extras 50%, 100% e adicional noturno com base no salário e na jornada de 220 horas.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-salario-liquido', 'calculadora-13-ferias', 'calculadora-de-horas'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 210,
    desktopGroup: 'trabalho',
    desktopLabel: 'Horas extras e noturno',
    desktopOrder: 40,
    mobileGroup: 'trabalho',
    mobileLabel: '⏱️ Horas extras',
    mobileOrder: 40,
    footerGroup: 'trabalho',
    footerLabel: 'Horas Extras',
    footerOrder: 40,
    linkLabel: 'calculadora de hora extra',
  },
  {
    slug: 'calculadora-vale-transporte',
    title: 'Vale-Transporte',
    description: 'Calcule o desconto legal máximo de 6% do salário e a participação estimada do empregador no transporte.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-salario-liquido', 'calculadora-hora-extra'],
    published: true,
    sitemapPriority: 0.85,
    changeFrequency: 'weekly',
    sitemapOrder: 220,
    desktopGroup: 'trabalho',
    desktopLabel: 'Vale-transporte',
    desktopOrder: 50,
    mobileGroup: 'trabalho',
    mobileLabel: '🚌 Vale-transporte',
    mobileOrder: 50,
    footerGroup: 'trabalho',
    footerLabel: 'Vale-Transporte',
    footerOrder: 50,
    linkLabel: 'calculadora de vale-transporte',
  },
  {
    slug: 'calculadora-bpc-loas',
    title: 'BPC / Loas',
    description: 'Compare a renda familiar per capita ao teto de referência do BPC. Não substitui análise do INSS ou CadÚnico.',
    category: 'trabalho',
    adTopic: 'labor',
    related: ['calculadora-salario-liquido', 'calculadora-rescisao-trabalhista'],
    published: true,
    sitemapPriority: 0.75,
    changeFrequency: 'monthly',
    sitemapOrder: 230,
    desktopGroup: 'trabalho',
    desktopLabel: 'BPC / renda per capita',
    desktopOrder: 70,
    mobileGroup: 'trabalho',
    mobileLabel: '🤝 BPC / renda per capita',
    mobileOrder: 70,
    footerGroup: 'trabalho',
    footerLabel: 'BPC / Renda',
    footerOrder: 70,
    linkLabel: 'calculadora de BPC / Loas',
  },
  {
    slug: 'calculo-hipoteca',
    title: 'Calculadora de Hipoteca',
    description: 'Página placeholder. Fora do sitemap até ficar pronta para produção.',
    category: 'financas',
    adTopic: 'finance',
    related: ['calculo-financiamento-imobiliario'],
    published: false,
    sitemapPriority: 0.5,
    changeFrequency: 'monthly',
    sitemapOrder: 900,
    desktopGroup: null,
    desktopLabel: null,
    desktopOrder: 0,
    mobileGroup: null,
    mobileLabel: null,
    mobileOrder: 0,
    footerGroup: null,
    footerLabel: null,
    footerOrder: 0,
    linkLabel: 'calculadora de hipoteca',
  },
  {
    slug: 'calendario-feriados',
    title: 'Calendário de Feriados',
    description: 'Página placeholder. O menu aponta para o site externo de feriados, não para esta rota.',
    category: 'ferramentas',
    adTopic: 'other',
    related: [],
    published: false,
    sitemapPriority: 0.5,
    changeFrequency: 'monthly',
    sitemapOrder: 910,
    desktopGroup: null,
    desktopLabel: null,
    desktopOrder: 0,
    mobileGroup: null,
    mobileLabel: null,
    mobileOrder: 0,
    footerGroup: null,
    footerLabel: null,
    footerOrder: 0,
    linkLabel: 'calendário de feriados',
  },
];

const bySlug = new Map(CALCULATORS.map((entry) => [entry.slug, entry]));

export function getCalculator(slug: string): CalculatorEntry {
  const entry = bySlug.get(slug);
  if (!entry) {
    throw new Error(`Unknown calculator slug: ${slug}`);
  }
  return entry;
}

export function getPublishedCalculators(): CalculatorEntry[] {
  return CALCULATORS.filter((entry) => entry.published);
}

export function getHomeCards(): CalculatorEntry[] {
  return getPublishedCalculators()
    .filter((entry) => entry.home)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
}

export function getDesktopGroup(group: DesktopGroup): CalculatorEntry[] {
  return getPublishedCalculators()
    .filter((entry) => entry.desktopGroup === group && entry.desktopLabel)
    .sort((a, b) => a.desktopOrder - b.desktopOrder);
}

export function getMobileGroup(group: MobileGroup): CalculatorEntry[] {
  return getPublishedCalculators()
    .filter((entry) => entry.mobileGroup === group && entry.mobileLabel)
    .sort((a, b) => a.mobileOrder - b.mobileOrder);
}

export function getFooterGroup(group: FooterGroup): CalculatorEntry[] {
  return getPublishedCalculators()
    .filter((entry) => entry.footerGroup === group && entry.footerLabel)
    .sort((a, b) => a.footerOrder - b.footerOrder);
}

export function getRelatedCalculators(slug: string): CalculatorEntry[] {
  const entry = getCalculator(slug);
  return entry.related.map((relatedSlug) => getCalculator(relatedSlug)).filter((item) => item.published);
}

export function calculatorPath(slug: string): string {
  return `/${slug}/`;
}

export function formatLabel(label: string, withYear: boolean | undefined, year: number): string {
  return withYear ? `${label} ${year}` : label;
}
