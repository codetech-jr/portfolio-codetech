import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/codetech-jr", label: "Visitar GitHub" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/alejandro-gabriel-daniel-919a17187/", label: "Visitar LinkedIn" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/codetechjunior/", label: "Visitar Instagram" },
  { icon: <FaFacebook />, path: "https://facebook.com/", label: "Visitar Facebook" },
];

const Social = ({ containerStyles = "flex gap-4 justify-center", iconStyles = "" }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="w-9 h-9 border rounded-full flex justify-center items-center border-accent text-accent hover:bg-accent hover:text-primary text-base hover:transition-all duration-500"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;

