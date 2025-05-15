import Link from "next/link";
import { Button } from "../components/ui/button";


// components
import Nav from "../components/Nav";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        // Puedes seguir usando clases globales o moverlas al módulo CSS también
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* logo */}
                <Link href="/">
                    {/* Aplica la clase del módulo CSS */}
                    <h1 className="text-4xl font-semibold"> {/* Opcional: Mover estilos del h1 */}
                        Codetech Junior
                        <span className="text-[#00C6FF]">.</span>
                    </h1>
                </Link>
                {/* dekstop nav */}
                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Link href="/contact">
                        <Button className="flex items-center gap-2 border-2 border-[#00C6FF] text-[#0C0C2C] hover:bg-[#00C6FF] hover:text-[#0C0C2C] transition-transform duration-300 ease-in-out px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 hover:animate-pulse">Contrátame</Button>
                    </Link>
                </div>

                {/*mobile nav*/}
                <div className="xl:hidden">
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header;