import Link from "next/link";
import IconGithub from "./icons/IconGithub";
import IconLinkedin from "./icons/IconLinkedin";
import IconInstagram from "./icons/IconInstagram";
import IconFacebook from "./icons/IconFacebook";

const socials = [
  { icon: <IconGithub className="w-5 h-5" />, path: "https://github.com/codetech-jr", label: "Visitar GitHub" },
  { icon: <IconLinkedin className="w-5 h-5" />, path: "https://www.linkedin.com/in/alejandro-gabriel-daniel-919a17187/", label: "Visitar LinkedIn" },
  { icon: <IconInstagram className="w-5 h-5" />, path: "https://www.instagram.com/codetechjunior/", label: "Visitar Instagram" },
  { icon: <IconFacebook className="w-5 h-5" />, path: "https://facebook.com/", label: "Visitar Facebook" },
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

