import { Link } from "@/i18n/routing";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

import Image from "next/image";

const Header = () => {
    return (
        <header className="py-4 text-white xl:py-6 sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
            <div className="container flex items-center justify-between mx-auto">
                {/* logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden transition-transform duration-300 xl:w-12 xl:h-12 group-hover:scale-110">
                        <Image 
                            src="/logo.png" 
                            alt="Codetech Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tighter xl:text-3xl font-display">
                        Codetech<span className="text-accent">.</span>
                    </h1>
                </Link>
                {/* dekstop nav */}
                <div className="items-center hidden gap-8 xl:flex">
                    <Nav />
                    <div className="flex items-center gap-4 ml-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </div>

                {/*mobile nav*/}
                <div className="flex items-center gap-4 xl:hidden">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <MobileNav />
                </div>
            </div>
        </header>
    )
}

export default Header;