"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", path: "/" },
    { name: "Servicios", path: "/services" },
    { name: "Resumen", path: "/resume" },
    { name: "Portafolio", path: "/work" },
    { name: "Contacto", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Guardados", path: "/blog/saved", icon: (
        <svg className="inline w-5 h-5 mb-1 mr-1 text-[#FFC857]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
    ) },
];

const Nav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex gap-8"> {/* Considera usar estilos de Nav.module.css aquí también si es necesario */}
            {links.map((link, index) => {
                return (
                    <Link
                    href={link.path}
                    key={index}
                    className={`${
                            link.path === pathname && "text-[#00C6FF] border-b-2 border-[#00C6FF]"
                        } capitalize font-medium hover:text-[#00C6FF] transition-all`}
                    >
                        {link.icon && link.icon}
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    );
};

export default Nav;