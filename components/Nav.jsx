"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", path: "/" },
    { name: "Servicios", path: "/services" },
    { name: "Resumen", path: "/resume" },
    { name: "Trabajos", path: "/work" },
    { name: "Contacto", path: "/contact" },
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
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    );
};

export default Nav;