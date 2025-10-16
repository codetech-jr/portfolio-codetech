import Link from "next/link";
import { Button } from "../components/ui/button";


// components
import Nav from "../components/Nav";
import MobileNav from "./MobileNav";

const Header = () => {
    return (
        // Puedes seguir usando clases globales o moverlas al módulo CSS también
        <header className="py-8 text-white xl:py-12">
            <div className="container flex items-center justify-between mx-auto">
                {/* logo */}
                <Link href="/">
                    {/* Aplica la clase del módulo CSS */}
                    <h1 className="text-4xl font-semibold"> {/* Opcional: Mover estilos del h1 */}
                        Codetech Junior
                        <span className="text-[#00C6FF]">.</span>
                    </h1>
                </Link>
                {/* dekstop nav */}
                <div className="items-center hidden gap-8 xl:flex">
                    <Nav />
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