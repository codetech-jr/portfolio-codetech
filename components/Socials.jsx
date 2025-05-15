import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/codetech-jr" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/alejandro-gabriel-daniel-919a17187/" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/codetechjunior/" },
  { icon: <FaFacebook />, path: "https://facebook.com/" },
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
          className="w-9 h-9 border rounded-full flex justify-center items-center border-[#00C6FF] text-[#00C6FF]  hover:bg-[#00C6FF] hover:text-[#0C0C2C] text-base hover:transition-all duration-500"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;

