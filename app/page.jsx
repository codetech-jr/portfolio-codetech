import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <section className="h-screen">
      <div className="container mx-auto h-full flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
        <div className="text-center xl:text-left flex flex-col gap-4">
          <span className="text-sm xl:text-xl">Frontend Developer</span>
          <h1 className="text-2xl xl:text-4xl font-bold mb-4">
            Hola, Soy <br /> <span className="text-[#00C6FF]">Junior Daniel</span>
          </h1>
          <p className="max-w-[500px] mb-6 text-white/80">
            Soy bueno creando experiencias digitales elegantes. También domino varios lenguajes y tecnologías de programación.
          </p>
          <div className="flex flex-col xl:flex-row items-center gap-6">
            <Button className="uppercase flex items-center gap-2 border-2 border-[#00C6FF] text-[#0C0C2C] hover:bg-[#0C0C2C] hover:text-[#00C6FF] transition-transform duration-300 ease-in-out px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105">
              <a href="/assets/curriculum-vitae.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span>Descargar CV</span>
                <FiDownload className="text-xl" />
              </a>
            </Button>
            <Socials containerStyles="flex gap-6 hover:text-[#00C6FF] transition-colors duration-300" />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Photo />
        </div>
      </div>
      <Stats />
    </section>
  );
}

