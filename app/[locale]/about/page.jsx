import AboutMe from "@/components/AboutMe";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs
      ? "Sobre Mí | Junior – CodeTechJr"
      : "About Me | Junior – CodeTechJr",
    description: isEs
      ? "Conoce a Junior, el desarrollador detrás de CodeTechJr. Misión, visión y valores que guían cada proyecto web."
      : "Meet Junior, the developer behind CodeTechJr. Mission, vision and values that guide every web project.",
  };
}

export default function AboutPage() {
  return <AboutMe />;
}
