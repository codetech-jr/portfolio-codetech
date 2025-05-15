import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi"
import Socials from "@/components/Socials"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"

export default function Home() {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Frontend Developer</span>
            <h1 className="h1 mb-6">
              Hola, Soy <br /> <span className="text-[#00C6FF]">Junior Daniel</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              Soy bueno creando experiencias digitales elegantes. También domino varios lenguajes y tecnologías de programación.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
<Button className="uppercase flex items-center gap-2 border-2 border-[#00C6FF] text-[#0C0C2C] hover:bg-[#0C0C2C] hover:text-[#00C6FF] transition-transform duration-300 ease-in-out px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105">
              <a href="/assets/curriculum-vitae.pdf" download="Mi_CV" className="flex items-center gap-2">
                <span>Descargar CV</span>
                <FiDownload className="text-xl" />
              </a>
            </Button>
              <div className="mb-8 xl:mb-0">
              <Socials 
                  containerStyles="flex gap-6"
              />
              </div>
            </div>
          </div>
          {/* photo */}
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Photo />
            </div>
        </div>
      </div>
      <Stats />
      
    </section>
  );
}
