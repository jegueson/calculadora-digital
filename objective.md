# Calculadora Digital Online - Project Objective

## Project Goal
Develop and maintain a comprehensive digital calculator platform that provides free, accessible, and user-friendly mathematical and financial calculation tools for students, professionals, and general users in Brazil.

## Primary Purpose
Create a modern, responsive web application that serves as a one-stop solution for various types of calculations, eliminating the need for multiple calculator apps or software installations. Grow organic traffic with SEO-optimized calculator and geo landing pages aligned to Brazilian search demand (Google Trends).

## Key Features Currently Implemented
- **Basic / Scientific / Percentage calculators**
- **Brazilian labor & tax tools**: salário líquido, FGTS, IR, rescisão, 13º/férias, hora extra, vale-transporte, DAS MEI, BPC/Loas
- **Finance tools**: juros compostos, financiamento imobiliário/veículo, CDB/CDI, cartão, consórcio, payback
- **Health tools**: IMC, calorias, aposentadoria
- **Utilities**: horas, gerador de senha
- **Hosting**: Cloudflare Workers static export

## Traffic Growth Initiative (Nov 2026)
Based on Google Trends (BR, last 12 months) for “calculadora”:
- Priority new tools (merged): gestacional, dias/dias úteis, juros (simples), regra de três, folha de pagamento, álcool×gasolina, idade, contagem regressiva
- Geo landing pages: hub + major Brazilian metros with unique local copy and internal links
- Trends cue: relative interest strong in DF, RN, PR, MT, PB, SC; absolute volume led by large metros
- Keep registry-driven sitemap/navigation for discoverability

## Technical Architecture
- **Frontend**: Next.js 15 (static `output: 'export'`) with TypeScript
- **Styling**: TailwindCSS 4.0
- **UI Components**: React 19 with custom components
- **Charts**: Chart.js with React-ChartJS-2
- **Deployment**: Cloudflare Workers (`wrangler.jsonc`)

## Success Metrics
- Recover weekly organic traffic decline via new indexed landing pages
- SEO: unique titles/canonicals, FAQ JSON-LD, internal linking
- Calculation accuracy and mobile UX
