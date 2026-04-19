import Image from "next/image";

type SocialIconLinkProps = {
  href: string;
  label: string;
  iconSrc: string;
  className?: string;
};

export function SocialIconLink({
  href,
  label,
  iconSrc,
  className = ""
}: SocialIconLinkProps) {
  return (
    <a
      aria-label={label}
      className={
        "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] shadow-[0_10px_28px_rgba(3,8,18,0.55)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/45 hover:bg-sky-400/[0.12]" +
        (className ? ` ${className}` : "")
      }
      href={href}
      rel="noreferrer"
      target="_blank"
      title={label}
    >
      <Image alt={label} height={22} src={iconSrc} width={22} />
    </a>
  );
}

