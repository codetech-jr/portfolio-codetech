"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Ear,
  Timer,
  Handshake,
  Gem,
  Target,
  Eye,
  CheckCircle2,
  Zap,
  Shield,
  Headphones,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ─── Icon maps ────────────────────────────────────────────────────────────
const VALUE_ICON_MAP = { Ear, Timer, Handshake, Gem };
const DIFF_ICON_MAP = { Zap, Shield, HeadphonesIcon: Headphones };

// ─── Animation presets ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ─── Bio Card (Large — col-span-7) ────────────────────────────────────────
function BioCard({ t }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={0}
      className="col-span-12 lg:col-span-7 row-span-2"
    >
      <Card className="group relative h-full overflow-hidden border border-white/10 bg-white/5 dark:bg-white/[0.04] backdrop-blur-md shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#00C6FF]/5">
        {/* Glow accent blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#00C6FF]/20 blur-3xl transition-transform duration-700 group-hover:scale-110"
        />
        <CardContent className="relative z-10 flex flex-col gap-6 p-7 sm:p-10 h-full">
          {/* Avatar + name row */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-2 ring-[#00C6FF]/50 shadow-lg shadow-[#00C6FF]/20">
              <AvatarImage src="/assets/photo.png" alt="Junior – CodeTechJr" />
              <AvatarFallback className="bg-[#00C6FF]/20 text-[#00C6FF] font-bold text-xl select-none">
                JR
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-white/50 leading-none">
                {t("greeting")}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                {t("handle")}
              </h1>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-emerald-400/40 text-emerald-400 bg-emerald-400/10 text-xs mt-1"
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {t("badge")}
              </Badge>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Bio paragraphs */}
          <div className="space-y-4 text-white/75 text-sm sm:text-base leading-relaxed">
            <p>{t("bio")}</p>
            <p>{t("bio2")}</p>
          </div>

          {/* Inline stat strip */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            {[
              { value: t("yearsBadge"), label: t("experienceLabel") },
              { value: t("stat2Value"), label: t("stat2Label") },
              { value: t("stat3Value"), label: t("stat3Label") },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-4 py-2 rounded-xl bg-[#00C6FF]/10 border border-[#00C6FF]/20 transition-colors duration-200 hover:bg-[#00C6FF]/15"
              >
                <span className="text-xl sm:text-2xl font-bold text-[#00C6FF] font-display leading-none">
                  {stat.value}
                </span>
                <span className="text-xs text-white/50 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Mission Card ─────────────────────────────────────────────────────────
function MissionCard({ t }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={1}
      className="col-span-12 sm:col-span-6 lg:col-span-5"
    >
      <Card className="group relative h-full overflow-hidden border border-[#00C6FF]/20 bg-white/5 dark:bg-white/[0.04] backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#00C6FF]/35">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#00C6FF]/15 blur-2xl transition-transform duration-700 group-hover:scale-125"
        />
        <CardContent className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#00C6FF]/15 border border-[#00C6FF]/30 shrink-0">
              <Target className="h-5 w-5 text-[#00C6FF]" />
            </div>
            <h2 className="font-display text-lg font-semibold text-white tracking-tight">
              {t("missionTitle")}
            </h2>
          </div>
          <Separator className="bg-white/10" />
          <p className="text-white/70 text-sm leading-relaxed flex-1">{t("missionText")}</p>
          <div className="flex items-center gap-2 text-xs text-[#00C6FF]/80">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{t("missionProof")}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Vision Card ──────────────────────────────────────────────────────────
function VisionCard({ t }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={2}
      className="col-span-12 sm:col-span-6 lg:col-span-5"
    >
      <Card className="group relative h-full overflow-hidden border border-violet-500/20 bg-white/5 dark:bg-white/[0.04] backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-xl hover:border-violet-500/35">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-violet-500/15 blur-2xl transition-transform duration-700 group-hover:scale-125"
        />
        <CardContent className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 h-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/30 shrink-0">
              <Eye className="h-5 w-5 text-violet-400" />
            </div>
            <h2 className="font-display text-lg font-semibold text-white tracking-tight">
              {t("visionTitle")}
            </h2>
          </div>
          <Separator className="bg-white/10" />
          <p className="text-white/70 text-sm leading-relaxed flex-1">{t("visionText")}</p>
          <div className="flex items-center gap-2 text-xs text-violet-400/80">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>{t("visionProof")}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Value Card ───────────────────────────────────────────────────────────
const VALUE_THEMES = [
  { gradient: "from-[#00C6FF]/15 to-[#00C6FF]/5", border: "border-[#00C6FF]/20", hoverBorder: "hover:border-[#00C6FF]/35", icon: "text-[#00C6FF]" },
  { gradient: "from-emerald-500/15 to-emerald-500/5", border: "border-emerald-500/20", hoverBorder: "hover:border-emerald-500/35", icon: "text-emerald-400" },
  { gradient: "from-amber-500/15 to-amber-500/5", border: "border-amber-500/20", hoverBorder: "hover:border-amber-500/35", icon: "text-amber-400" },
  { gradient: "from-violet-500/15 to-violet-500/5", border: "border-violet-500/20", hoverBorder: "hover:border-violet-500/35", icon: "text-violet-400" },
];

function ValueCard({ value, index }) {
  const Icon = VALUE_ICON_MAP[value.icon] ?? Gem;
  const theme = VALUE_THEMES[index % VALUE_THEMES.length];

  return (
    <motion.div
      variants={staggerItem}
      className="col-span-6 sm:col-span-6 lg:col-span-3"
    >
      <Card
        className={`group h-full bg-gradient-to-br ${theme.gradient} border ${theme.border} ${theme.hoverBorder} backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      >
        <CardContent className="p-5 sm:p-6 flex flex-col gap-3 h-full">
          <div
            className={`flex items-center justify-center h-11 w-11 rounded-xl border ${theme.border} bg-white/5 transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className={`h-5 w-5 ${theme.icon}`} />
          </div>
          <h3 className="font-display text-base font-semibold text-white leading-snug">
            {value.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Differentiator Card ──────────────────────────────────────────────────
function DifferentiatorCard({ item, index }) {
  const Icon = DIFF_ICON_MAP[item.icon] ?? Zap;
  const colors = [
    { bg: "bg-[#00C6FF]/10", border: "border-[#00C6FF]/25", text: "text-[#00C6FF]" },
    { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400" },
    { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-400" },
  ];
  const c = colors[index % colors.length];

  return (
    <motion.div variants={staggerItem} className="flex items-start gap-4">
      <div
        className={`flex items-center justify-center h-10 w-10 rounded-lg ${c.bg} border ${c.border} shrink-0`}
      >
        <Icon className={`h-5 w-5 ${c.text}`} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-white">{item.title}</span>
        <span className="text-xs text-white/55 leading-relaxed">{item.description}</span>
      </div>
    </motion.div>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────
function CTABanner({ t }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={5}
      className="col-span-12"
    >
      <Card className="group relative overflow-hidden border border-[#00C6FF]/20 bg-gradient-to-r from-[#00C6FF]/10 via-violet-500/10 to-[#00C6FF]/10 backdrop-blur-md shadow-xl">
        {/* Animated glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#00C6FF]/20 blur-3xl transition-transform duration-1000 group-hover:translate-x-6 group-hover:translate-y-4"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-violet-500/20 blur-3xl transition-transform duration-1000 group-hover:-translate-x-6 group-hover:-translate-y-4"
        />

        <CardContent className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-8 sm:p-12">
          {/* Icon */}
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[#00C6FF]/15 border border-[#00C6FF]/30 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="h-7 w-7 text-[#00C6FF]" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              {t("ctaTitle")}
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg">
              {t("ctaDescription")}
            </p>
          </div>

          {/* Button */}
          <Link
            href="https://wa.me/584126000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C6FF] text-primary font-semibold text-sm shadow-lg shadow-[#00C6FF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#00C6FF]/35 hover:scale-105 active:scale-100 shrink-0"
          >
            {t("ctaButton")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function AboutMe() {
  const t = useTranslations("about");
  const values = t.raw("values");
  const differentiators = t.raw("differentiators");

  return (
    <main className="relative w-full min-h-screen pt-24 pb-28 overflow-hidden">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#00C6FF]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-3"
        >
          <span className="block h-px w-8 bg-[#00C6FF]" aria-hidden />
          <span className="text-[#00C6FF] text-sm font-medium tracking-widest uppercase">
            {t("sectionLabel")}
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.5}
          className="mb-12"
        >
          <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl">
            {t("headline")}{" "}
            <span className="text-[#00C6FF]">{t("headlineHighlight")}</span>
          </h1>
        </motion.div>

        {/* ── Bento Grid ──────────────────────────────── */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5">
          {/* Row 1 — Bio + Mission + Vision */}
          <BioCard t={t} />
          <MissionCard t={t} />
          <VisionCard t={t} />

          {/* Row 2 — Values strip (staggered) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-12 grid grid-cols-12 gap-4 sm:gap-5"
          >
            {Array.isArray(values) &&
              values.map((value, i) => (
                <ValueCard key={value.title} value={value} index={i} />
              ))}
          </motion.div>
        </div>

        {/* Values section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          className="text-white/40 text-xs text-center mt-6 tracking-widest uppercase"
        >
          {t("valuesTitle")}
        </motion.p>

        {/* ── Differentiators + CTA ─────────────────── */}
        <div className="grid grid-cols-12 gap-4 sm:gap-5 mt-12">
          {/* Why me — compact differentiator bar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-12"
          >
            <Card className="border border-white/10 bg-white/5 dark:bg-white/[0.04] backdrop-blur-md shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <motion.h3
                  variants={staggerItem}
                  className="font-display text-lg font-semibold text-white tracking-tight mb-6"
                >
                  {t("differentiatorTitle")}
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {Array.isArray(differentiators) &&
                    differentiators.map((item, i) => (
                      <DifferentiatorCard key={item.title} item={item} index={i} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Banner */}
          <CTABanner t={t} />
        </div>
      </div>
    </main>
  );
}
