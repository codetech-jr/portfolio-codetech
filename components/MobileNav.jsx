"use client";

import {Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetVariants} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { CiMenuFries } from 'react-icons/ci'

const links = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Servicios',
        path: '/services'
    },
    {
        name: 'Resumen',
        path: '/resume'
    },
    {
        name: 'Trabajos',
        path: '/work'
    },
    {
        name: 'Contacto',
        path: '/contact'
    },
    {
        name: 'Guardados',
        path: '/blog/saved',
        icon: (
            <svg className="inline w-5 h-5 mb-1 mr-1 text-[#FFC857]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
        )
    },
]


const MobileNav = () => {
    const pathname = usePathname();
    return  <Sheet>
        <SheetHeader>
            <SheetTitle className="sr-only">Navegación Principal</SheetTitle>
        </SheetHeader>

                <SheetTrigger className="flex justify-center items-center">
                    <CiMenuFries className="text-[32px] text-[#00C6FF]" />
                </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        {/* logo */}
                        <div className="mt-32 mb-40 text-center text-2xl">
                            <Link href="/">
                            <h1 className="text-4xl font-semibold">Codetech Junior<span className="text-[#00C6FF]">.</span></h1>
                            </Link>
                        </div>
                        {/*nav*/}
                        <nav className="flex flex-col justify-center items-center gap-8">
                        {links.map((link, index) => {
                            return (
                                <Link 
                                    href={link.path} 
                                    key={index} 
                                    className={`${link.path === pathname && "text-[#00C6FF] border-b-2 border-[#00C6FF]"} text-xl capitalize hover:text-[#00C6FF] transition-all`} // .trim() elimina espacios extra al inicio/final
                                >
                                    {link.icon && link.icon}
                                    {link.name}
                                </Link>
                            );
            })}
                        </nav>
                    </SheetContent>
                
            </Sheet>
}

export default MobileNav;