/**
 * Brazil metro landing pages for local SEO around “calculadora” + city intent.
 * Copy is unique per city; tools linked are existing published calculators.
 */

import { SITE_URL } from './calculators.ts';

export interface GeoToolLink {
  href: string;
  label: string;
  blurb: string;
}

export interface GeoLocation {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  region: string;
  /** Relative Trends interest cue for editorial prioritization (not absolute volume). */
  trendsNote: string;
  intro: string;
  localContext: string;
  transportNote: string;
  fuelNote: string;
  tools: GeoToolLink[];
  faqs: { question: string; answer: string }[];
}

const sharedTools = (city: string): GeoToolLink[] => [
  {
    href: '/calculadora-salario-liquido/',
    label: 'Salário líquido',
    blurb: `Estime o líquido CLT com INSS e IRRF — útil para propostas de emprego em ${city}.`,
  },
  {
    href: '/calculadora-fgts/',
    label: 'FGTS',
    blurb: `Simule saldo e cenários de saque do FGTS para quem trabalha em ${city}.`,
  },
  {
    href: '/calculadora-imposto-renda/',
    label: 'Imposto de renda',
    blurb: 'Calcule faixas e estimativa de IR com foco em planejamento anual.',
  },
  {
    href: '/juros-compostos/',
    label: 'Juros compostos',
    blurb: 'Projete investimentos e dívidas com juros compostos.',
  },
  {
    href: '/calculadora-porcentagem/',
    label: 'Porcentagem',
    blurb: 'Descontos, aumentos e proporções do dia a dia.',
  },
  {
    href: '/calculadora-de-horas/',
    label: 'Horas',
    blurb: 'Some horas de ponto, plantões e freelas.',
  },
];

export const GEO_LOCATIONS: readonly GeoLocation[] = [
  {
    slug: 'sao-paulo',
    city: 'São Paulo',
    state: 'São Paulo',
    stateCode: 'SP',
    region: 'Sudeste',
    trendsNote: 'Maior mercado absoluto de buscas no Brasil.',
    intro:
      'Encontre calculadoras online grátis pensadas para o dia a dia em São Paulo: salário líquido, FGTS, IR, juros e horas de trabalho.',
    localContext:
      'São Paulo concentra a maior massa salarial do país. Negociações de emprego e custo de vida alto tornam ferramentas de salário líquido, IR e financiamento especialmente relevantes para quem vive na capital ou no ABC.',
    transportNote:
      'Quem usa ônibus, metrô e CPTM costuma descontar vale-transporte na folha. Use a calculadora de salário líquido e informe o valor mensal de VT da sua linha.',
    fuelNote:
      'Preços de etanol e gasolina variam entre zonas e rodovias de acesso (Anhanguera, Dutra, Imigrantes). Compare combustível no posto do seu bairro antes de longos trajetos.',
    tools: sharedTools('São Paulo'),
    faqs: [
      {
        question: 'Existe calculadora online grátis para usar em São Paulo?',
        answer:
          'Sim. Esta página reúne atalhos para salário líquido, FGTS, imposto de renda, juros compostos, porcentagem e horas — todas gratuitas e sem cadastro.',
      },
      {
        question: 'Como estimar o salário líquido de uma vaga em SP?',
        answer:
          'Informe o bruto na calculadora de salário líquido, inclua dependentes de IRRF e o valor aproximado de vale-transporte que a empresa desconta.',
      },
    ],
  },
  {
    slug: 'rio-de-janeiro',
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    stateCode: 'RJ',
    region: 'Sudeste',
    trendsNote: 'Alto volume absoluto na região Sudeste.',
    intro:
      'Calculadoras online para quem mora ou trabalha no Rio de Janeiro: folha, FGTS, IR e finanças pessoais.',
    localContext:
      'No Rio, combinações de emprego formal, plantões e renda variável (turismo, serviços, petróleo) pedem checagens rápidas de líquido, horas e porcentagens de comissão.',
    transportNote:
      'Bilhete Único e integrações municipais/intermunicipais mudam o custo mensal de deslocamento. Ajuste o VT na simulação de salário líquido.',
    fuelNote:
      'Postos na Zona Sul, Barra e Baixada podem divergir bastante. Vale recalcular rotinas de app/carro com o preço local do dia.',
    tools: sharedTools('Rio de Janeiro'),
    faqs: [
      {
        question: 'Quais calculadoras são mais usadas no Rio?',
        answer:
          'Salário líquido, FGTS, imposto de renda e juros compostos costumam ser as mais buscadas por quem compara propostas e organiza as contas mensais.',
      },
    ],
  },
  {
    slug: 'brasilia',
    city: 'Brasília',
    state: 'Distrito Federal',
    stateCode: 'DF',
    region: 'Centro-Oeste',
    trendsNote: 'Maior interesse relativo no Trends por estado (DF = 100).',
    intro:
      'Calculadoras online para Brasília e o Distrito Federal — úteis para servidores, concursandos e profissionais do setor privado.',
    localContext:
      'O DF lidera o interesse relativo por “calculadora” no Google Trends entre as UFs. Concursos, gratificações e planejamentos de aposentadoria/IR tornam as ferramentas de folha e finanças especialmente úteis.',
    transportNote:
      'O deslocamento entre Plano Piloto, satélites e Entorno muda o custo mensal. Inclua VT ou combustível na sua simulação de líquido.',
    fuelNote:
      'Preços no DF e no Entorno (GO) podem diferir. Compare etanol e gasolina com os valores do posto que você usa de verdade.',
    tools: sharedTools('Brasília'),
    faqs: [
      {
        question: 'Por que Brasília aparece forte em buscas de calculadora?',
        answer:
          'O interesse relativo no DF é alto no Google Trends. Há muita demanda por simulações de salário, IR e finanças ligadas a concursos e carreira pública/privada.',
      },
    ],
  },
  {
    slug: 'belo-horizonte',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    stateCode: 'MG',
    region: 'Sudeste',
    trendsNote: 'MG entre os estados com interesse relativo elevado.',
    intro:
      'Calculadoras grátis para Belo Horizonte e região metropolitana: salário, FGTS, IR e juros.',
    localContext:
      'BH e o Vetor Norte/Sul concentram indústria, serviços e servidor público estadual. Simular líquido e FGTS ajuda a comparar propostas dentro da RMBH.',
    transportNote:
      'Ônibus municipal e linhas metropolitanas têm tarifas próprias. Use o valor real do seu passe na calculadora de salário líquido.',
    fuelNote:
      'Rotas para Contagem, Betim e Confins mudam o custo por km. Atualize preços locais antes de viajar.',
    tools: sharedTools('Belo Horizonte'),
    faqs: [
      {
        question: 'Posso calcular FGTS e rescisão morando em BH?',
        answer:
          'Sim. As regras são federais; use as calculadoras de FGTS e rescisão trabalhista com os valores do seu contrato.',
      },
    ],
  },
  {
    slug: 'curitiba',
    city: 'Curitiba',
    state: 'Paraná',
    stateCode: 'PR',
    region: 'Sul',
    trendsNote: 'Paraná entre os estados de maior interesse relativo (≈98).',
    intro:
      'Calculadoras online para Curitiba e o Paraná: folha, impostos, juros e horas.',
    localContext:
      'Curitiba tem forte presença industrial e de serviços. O Paraná aparece no topo do interesse relativo por “calculadora” no Trends — sinal de demanda estável por ferramentas práticas.',
    transportNote:
      'O transporte integrado de Curitiba facilita o cálculo mensal de VT. Informe o desconto real na simulação de líquido.',
    fuelNote:
      'O Paraná é relevante na cadeia do etanol; compare sempre o preço da semana no seu bairro.',
    tools: sharedTools('Curitiba'),
    faqs: [
      {
        question: 'Quais ferramentas ajudam quem trabalha em Curitiba?',
        answer:
          'Salário líquido, horas, FGTS e juros compostos cobrem a maior parte das contas mensais e de planejamento.',
      },
    ],
  },
  {
    slug: 'porto-alegre',
    city: 'Porto Alegre',
    state: 'Rio Grande do Sul',
    stateCode: 'RS',
    region: 'Sul',
    trendsNote: 'RS com interesse relativo consistente no Sul.',
    intro:
      'Calculadoras para Porto Alegre e região metropolitana gaúcha: salário, FGTS, IR e finanças.',
    localContext:
      'POA combina serviços, indústria e setor público. Ferramentas de líquido e juros ajudam a planejar o mês com clareza.',
    transportNote:
      'Trensurb e ônibus metropolitanos entram no orçamento de quem cruza a RMPA. Ajuste o VT na simulação.',
    fuelNote:
      'Preços na Capital e no Interior podem divergir. Use valores do posto local para comparar combustível.',
    tools: sharedTools('Porto Alegre'),
    faqs: [
      {
        question: 'Como calcular horas extras em Porto Alegre?',
        answer:
          'Use a calculadora de hora extra com seu salário-hora e adicionais do contrato; as regras gerais seguem a CLT.',
      },
    ],
  },
  {
    slug: 'salvador',
    city: 'Salvador',
    state: 'Bahia',
    stateCode: 'BA',
    region: 'Nordeste',
    trendsNote: 'Grande mercado nordestino em volume absoluto.',
    intro:
      'Calculadoras online para Salvador: salário líquido, FGTS, IR, porcentagem e juros.',
    localContext:
      'Salvador concentra serviços, turismo e administração pública. Simulações de folha e FGTS ajudam na comparação de propostas na RMS.',
    transportNote:
      'Integração ônibus/metrô muda o custo mensal. Coloque o valor real de VT na calculadora de salário líquido.',
    fuelNote:
      'Compare etanol e gasolina com preços da orla, Subúrbio e região metropolitana — podem variar no mesmo dia.',
    tools: sharedTools('Salvador'),
    faqs: [
      {
        question: 'As calculadoras funcionam para a Bahia?',
        answer:
          'Sim. INSS, IRRF e FGTS são regras federais. O que muda localmente é custo de vida, VT e preço de combustível.',
      },
    ],
  },
  {
    slug: 'fortaleza',
    city: 'Fortaleza',
    state: 'Ceará',
    stateCode: 'CE',
    region: 'Nordeste',
    trendsNote: 'Ceará com interesse relativo alto (≈88).',
    intro:
      'Calculadoras grátis para Fortaleza: líquido CLT, FGTS, imposto de renda e juros.',
    localContext:
      'Fortaleza cresce em serviços e tecnologia. Ferramentas de salário e porcentagem ajudam freelas e CLT a fechar as contas.',
    transportNote:
      'Informe o custo mensal de ônibus/metrô na simulação de líquido para refletir o deslocamento real.',
    fuelNote:
      'No Nordeste, a competitividade do etanol muda conforme a safra e a logística. Atualize os preços locais.',
    tools: sharedTools('Fortaleza'),
    faqs: [
      {
        question: 'Posso simular IR em Fortaleza?',
        answer:
          'Sim. Use a calculadora de imposto de renda com seus rendimentos; a tabela é nacional.',
      },
    ],
  },
  {
    slug: 'recife',
    city: 'Recife',
    state: 'Pernambuco',
    stateCode: 'PE',
    region: 'Nordeste',
    trendsNote: 'Polo nordestino com demanda estável por ferramentas práticas.',
    intro:
      'Calculadoras online para Recife e a RMR: salário, FGTS, IR e finanças pessoais.',
    localContext:
      'Recife é polo de serviços e tecnologia. Comparar líquido entre propostas na RMR é um uso comum das calculadoras de folha.',
    transportNote:
      'BRT, ônibus e deslocamentos intermunicipais entram no orçamento. Ajuste o VT na simulação.',
    fuelNote:
      'Preços entre Recife, Olinda e Jaboatão podem divergir. Use o posto da sua rotina.',
    tools: sharedTools('Recife'),
    faqs: [
      {
        question: 'Quais calculadoras usar no Recife?',
        answer:
          'Comece por salário líquido e FGTS; depois juros compostos e porcentagem para orçamento e descontos.',
      },
    ],
  },
  {
    slug: 'manaus',
    city: 'Manaus',
    state: 'Amazonas',
    stateCode: 'AM',
    region: 'Norte',
    trendsNote: 'Principal polo urbano do Norte.',
    intro:
      'Calculadoras online para Manaus: folha, FGTS, IR, juros e horas.',
    localContext:
      'O Polo Industrial e o setor de serviços em Manaus geram muita consulta a salário líquido e benefícios. As regras trabalhistas usadas aqui são as federais.',
    transportNote:
      'Deslocamentos longos na cidade elevam o custo de transporte. Inclua VT ou combustível na simulação.',
    fuelNote:
      'Logística amazônica pode encarecer combustíveis. Compare sempre com o preço local do dia.',
    tools: sharedTools('Manaus'),
    faqs: [
      {
        question: 'As calculadoras consideram incentivos da ZFM?',
        answer:
          'Não automaticamente. Use os valores do seu holerite/contrato; benefícios específicos devem ser somados manualmente quando existirem.',
      },
    ],
  },
  {
    slug: 'goiania',
    city: 'Goiânia',
    state: 'Goiás',
    stateCode: 'GO',
    region: 'Centro-Oeste',
    trendsNote: 'GO com interesse relativo relevante (≈82).',
    intro:
      'Calculadoras para Goiânia: salário líquido, FGTS, IR e juros compostos.',
    localContext:
      'Goiânia e o Entorno do DF compartilham mobilidade de mão de obra. Simular líquido ajuda a comparar propostas entre GO e DF.',
    transportNote:
      'Quem cruza municípios da região metropolitana deve usar o custo real de transporte na simulação.',
    fuelNote:
      'O Centro-Oeste costuma ter dinâmica própria de etanol. Atualize preços em Goiânia antes de viajar.',
    tools: sharedTools('Goiânia'),
    faqs: [
      {
        question: 'Serve para quem trabalha no Entorno?',
        answer:
          'Sim. As calculadoras são as mesmas; o que muda é VT, combustível e custo de vida local.',
      },
    ],
  },
  {
    slug: 'campinas',
    city: 'Campinas',
    state: 'São Paulo',
    stateCode: 'SP',
    region: 'Sudeste',
    trendsNote: 'Importante polo do interior paulista.',
    intro:
      'Calculadoras online para Campinas e região: salário, FGTS, IR e finanças.',
    localContext:
      'Campinas é polo de tecnologia, educação e indústria. Comparar propostas com líquido e FGTS é comum na RMC.',
    transportNote:
      'Deslocamentos para Valinhos, Vinhedo e Americana pesam no orçamento. Inclua o custo real na simulação.',
    fuelNote:
      'Preços na Anhanguera/Bandeirantes mudam rápido. Recalcule rotinas semanais com valores locais.',
    tools: sharedTools('Campinas'),
    faqs: [
      {
        question: 'Quais ferramentas priorizar em Campinas?',
        answer:
          'Salário líquido, horas e juros compostos cobrem trabalho CLT, freela e planejamento financeiro.',
      },
    ],
  },
  {
    slug: 'florianopolis',
    city: 'Florianópolis',
    state: 'Santa Catarina',
    stateCode: 'SC',
    region: 'Sul',
    trendsNote: 'SC entre os estados de maior interesse relativo (≈92).',
    intro:
      'Calculadoras para Florianópolis e Santa Catarina: folha, impostos e juros.',
    localContext:
      'Floripa concentra tecnologia, turismo e serviços. SC aparece alto no interesse relativo do Trends por “calculadora”.',
    transportNote:
      'Deslocamentos ilha–continente mudam o custo mensal. Ajuste VT ou combustível na simulação de líquido.',
    fuelNote:
      'Compare etanol e gasolina com preços da Grande Florianópolis antes de viagens pelo litoral.',
    tools: sharedTools('Florianópolis'),
    faqs: [
      {
        question: 'Posso usar as calculadoras em toda SC?',
        answer:
          'Sim. As regras de INSS/IR/FGTS são nacionais; personalize apenas custos locais como transporte e combustível.',
      },
    ],
  },
  {
    slug: 'natal',
    city: 'Natal',
    state: 'Rio Grande do Norte',
    stateCode: 'RN',
    region: 'Nordeste',
    trendsNote: 'RN com interesse relativo muito alto (≈98).',
    intro:
      'Calculadoras online para Natal e o Rio Grande do Norte: salário, FGTS, IR e juros.',
    localContext:
      'O RN está no topo do interesse relativo por “calculadora” no Google Trends. Natal combina turismo, serviços e setor público — demandas típicas de folha e finanças.',
    transportNote:
      'Inclua o custo real de ônibus ou apps na simulação de salário líquido.',
    fuelNote:
      'Atualize etanol/gasolina com preços locais antes de deslocamentos longos pelo litoral.',
    tools: sharedTools('Natal'),
    faqs: [
      {
        question: 'Por que Natal tem página própria?',
        answer:
          'Porque o RN mostra interesse relativo alto no Trends e Natal é o principal polo de busca e emprego do estado.',
      },
    ],
  },
  {
    slug: 'joao-pessoa',
    city: 'João Pessoa',
    state: 'Paraíba',
    stateCode: 'PB',
    region: 'Nordeste',
    trendsNote: 'PB com interesse relativo alto (≈92).',
    intro:
      'Calculadoras grátis para João Pessoa: líquido CLT, FGTS, imposto de renda e juros.',
    localContext:
      'A Paraíba também aparece alto no interesse relativo do Trends. João Pessoa concentra serviços e administração pública com demanda por simulações rápidas.',
    transportNote:
      'Use o valor mensal real de transporte na calculadora de salário líquido.',
    fuelNote:
      'Compare combustível com preços da capital e da região metropolitana.',
    tools: sharedTools('João Pessoa'),
    faqs: [
      {
        question: 'As calculadoras são gratuitas em João Pessoa?',
        answer:
          'Sim. Todas as ferramentas linkadas aqui são online, grátis e sem cadastro.',
      },
    ],
  },
];

const bySlug = new Map(GEO_LOCATIONS.map((entry) => [entry.slug, entry]));

export function getGeoLocation(slug: string): GeoLocation | undefined {
  return bySlug.get(slug);
}

export function getAllGeoLocations(): readonly GeoLocation[] {
  return GEO_LOCATIONS;
}

export function geoPath(slug: string): string {
  return `/br/${slug}/`;
}

export function geoCanonical(slug: string): string {
  return `${SITE_URL}${geoPath(slug)}`;
}

export const GEO_HUB_PATH = '/calculadoras-por-cidade/';
export const GEO_HUB_CANONICAL = `${SITE_URL}${GEO_HUB_PATH}`;
