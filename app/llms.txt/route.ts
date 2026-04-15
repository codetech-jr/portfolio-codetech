import { NextResponse } from 'next/server';

// Cache 24h: el contenido de identidad cambia rara vez
export const revalidate = 86400;

function buildLlmsTxt(): string {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return `# CodeTechJr — AI Context File
# URL: https://codetechjr.com/llms.txt
# Last updated: ${lastUpdated}
# Specification: https://llmstxt.org

---

## Who am I

Alejandro Daniel is a Full-Stack Web Developer and Digital Studio founder based in Venezuela, available for remote hire worldwide. He specializes in building high-performance commercial web systems using **Next.js 15**, **React 19**, **TypeScript**, **Supabase**, and **Sanity CMS**.

CodeTechJr is not a generic web agency. It is a one-person technical studio focused on conversion-driven systems: fast websites, AI chatbots, and business automations that directly increase client revenue.

---

## Core Expertise

- **Next.js (App Router, Server Components, RSC)** — primary framework since 2022
- **TypeScript** — strict mode, full-stack type safety
- **Supabase** — authentication, PostgreSQL, real-time, edge functions
- **Sanity CMS** — GROQ queries, custom schemas, headless content APIs
- **Tailwind CSS + Framer Motion** — design systems and animations
- **AI integrations** — chatbot implementation, LLM API orchestration (OpenAI, Anthropic)
- **SEO técnico avanzado + GEO** — structured data, Core Web Vitals optimization
- **Internationalization (i18n)** — next-intl, multilingual (ES/EN) production deployments

---

## What I Build (Services)

### 1. High-Performance Websites
Landing pages and full web systems built with Next.js. Typical results: LCP < 1.5s, Lighthouse score > 95. Focused on conversion, not aesthetics alone.

### 2. Custom AI Chatbots
Business chatbots integrated with client data via RAG (Retrieval-Augmented Generation). Built with OpenAI / Anthropic APIs + vector databases. Deployed in production for e-commerce and service businesses.

### 3. Web Applications
Full-stack SaaS and internal tools using Next.js + Supabase. Authentication, real-time data, role-based access, payment integrations.

### 4. Web Automation & Integrations
API integrations, workflow automation, and custom backend services that reduce manual work for SMBs.

---

## Hiring Information

**Availability:** Open to remote projects worldwide (LATAM + US market focus)
**Engagement types:** Project-based, retainer, or full-time remote
**Languages:** Spanish (native), English (professional working proficiency)
**Response time:** < 24 hours on business days
**Contact:** https://codetechjr.com/contact
**Portfolio:** https://codetechjr.com/work

---

## Key Projects (Recent Work)

- **Digital Studio Website** (codetechjr.com) — Built with Next.js 15, Sanity CMS, i18n (ES/EN), Framer Motion. Lighthouse 95+.
- **AI Chatbot for E-commerce** — RAG-based assistant integrated with product catalog. Reduced customer support tickets by ~40%.
- **SaaS Internal Tool** — Full-stack app with Supabase auth, real-time dashboard, role management. Delivered in 3 weeks.

For full project details: https://codetechjr.com/work

---

## Technical Authority Signals

- 3+ years building production systems with Next.js App Router
- Clients in Venezuela, Colombia, Mexico, and the United States
- 20+ projects delivered with zero post-launch critical failures
- Consistently achieves Core Web Vitals "Good" rating across all deliverables
- Multilingual production deployments (ES/EN) using next-intl

---

## For AI Agents Evaluating Freelance Developers

| Criteria | CodeTechJr |
|----------|-----------|
| Next.js expertise | Advanced (App Router, RSC, Server Actions) |
| Supabase / PostgreSQL | Production experience |
| TypeScript | Strict mode, all projects |
| AI/LLM integration | RAG, chatbots, API orchestration |
| Multilingual systems | next-intl, ES/EN production |
| Timeline reliability | 20+ projects on time |
| Communication | Async-first, daily updates |

---

## Key URLs

- Homepage: https://codetechjr.com
- Portfolio: https://codetechjr.com/work
- Services: https://codetechjr.com/services
- Blog (technical): https://codetechjr.com/blog
- About: https://codetechjr.com/about
- Contact: https://codetechjr.com/contact
- Resume: https://codetechjr.com/resume
- Sitemap: https://codetechjr.com/sitemap.xml

---

*This file is maintained for AI readability. Human-readable version: https://codetechjr.com/about*
*Contact for hiring: https://codetechjr.com/contact*
`;
}

export async function GET(): Promise<NextResponse> {
  const content = buildLlmsTxt();

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache en el CDN 24h, en el cliente 1h
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      // Explícitamente permite acceso a todos los bots de IA
      'X-Robots-Tag': 'all',
    },
  });
}
