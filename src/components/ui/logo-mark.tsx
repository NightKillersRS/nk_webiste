import Image from "next/image";
import Link from "next/link";

type LogoMarkProps = {
  compact?: boolean;
};

export function LogoMark({ compact = false }: LogoMarkProps) {
  return (
    <Link
      aria-label="Night Killers home"
      className="inline-flex items-center"
      href="/"
    >
      <Image
        alt="Night Killers crest"
        className={
          compact
            ? "h-14 w-auto drop-shadow-[0_18px_38px_rgba(32,110,255,0.22)]"
            : "h-24 w-auto drop-shadow-[0_28px_54px_rgba(32,110,255,0.24)]"
        }
        height={compact ? 56 : 96}
        priority
        src="/assets/brand/night-killers-crest.png"
        width={compact ? 56 : 96}
      />
    </Link>
  );
}
