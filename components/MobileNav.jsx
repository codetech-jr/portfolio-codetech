"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
// lightweight inline menu icon to avoid bundling react-icons
import Image from "next/image";

const MobileNav = () => {
    const pathname = usePathname();
    const t = useTranslations("nav");

    const links = [
        { name: t("home"), path: '/' },
        { name: t("about"), path: '/about' },
        { name: t("services"), path: '/services' },
        { name: t("projects"), path: '/work' },
        { name: t("contact"), path: '/contact' },
        { name: t("blog"), path: '/blog' },
    ];

    return (
        <Sheet>
            <SheetHeader>
                <SheetTitle className="sr-only">Navegación Principal</SheetTitle>
            </SheetHeader>

            <SheetTrigger className="flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
                    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                    <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
                </svg>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                {/* logo */}
                <div className="flex flex-col items-center gap-4 mt-32 mb-32 text-2xl">
                    <SheetClose asChild>
                        <Link href="/" className="flex flex-col items-center gap-2">
                            <div className="relative w-20 h-20 overflow-hidden">
                                <Image 
                                    src="/logo.png" 
                                    alt="Codetech Logo" 
                                    fill
                                    sizes="40px"
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="text-4xl font-bold font-display">
                                Codetech<span className="text-accent">.</span>
                            </h1>
                        </Link>
                    </SheetClose>
                </div>
                {/*nav*/}
                <nav className="flex flex-col items-center justify-center gap-8">
                    {links.map((link, index) => {
                        return (
                            <SheetClose asChild key={index}>
                                <Link
                                    href={link.path}
                                    className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
                                >
                                    {link.name}
                                </Link>
                            </SheetClose>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;