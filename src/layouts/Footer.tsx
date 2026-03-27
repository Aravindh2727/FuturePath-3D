import React from "react";
import { School } from "lucide-react";
import { Link } from "react-router-dom";

const LinkedinSquare = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" width={20} height={20} fill="currentColor" aria-hidden="true" {...props}>
    <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.79 53.79 0 1 1 53.79-53.8 53.8 53.8 0 0 1-53.79 53.8zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.26-79.2-48.3 0-55.7 37.7-55.7 76.6V448H158.6V148.9h88.94v40.8h1.3c12.4-23.6 42.6-48.5 87.7-48.5 93.8 0 111.1 61.8 111.1 142.3V448z" />
  </svg>
);
const LinkIcon = LinkedinSquare;

const Footer = () => {
  const socials = [
    { icon: LinkIcon, href: "https://www.linkedin.com/in/aravindh-v2727/", label: "LinkedIn", external: true },
    { icon: School, href: "/colleges", label: "Colleges", external: false },
  ];

  return (
    <footer className="border-t border-white/5 bg-surface/60 backdrop-blur-xl mt-12">
      <div className="page-container py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between overflow-x-hidden">
        <div>
          <div className="text-sm text-neutral-300">FuturePath 3D</div>
          <p className="text-xs text-neutral-400">
            Building the immersive learning OS for future-ready students.
          </p>
        </div>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-neutral-100 hover:border-primary/60 hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-neutral-100 hover:border-primary/60 hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </Link>
            ),
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
