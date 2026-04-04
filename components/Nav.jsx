"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Nav = () => {
    const pathname = usePathname();
    const t = useTranslations("nav");

    const links = [
        { name: t("home"), path: "/" },
        { name: t("about"), path: "/about" },
        { name: t("services"), path: "/services" },
        { name: t("projects"), path: "/work" },
        { name: t("contact"), path: "/contact" },
        { name: t("blog"), path: "/blog" },
    ];

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${
                            link.path === pathname && "text-accent border-b-2 border-accent"
                        } capitalize font-medium hover:text-accent transition-all`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav;