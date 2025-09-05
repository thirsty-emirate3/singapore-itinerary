import Image from "next/image";

interface ThumbProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Thumb({ src, alt, className = "" }: ThumbProps) {
  return (
    <div className={`w-12 h-12 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="w-full h-full object-cover"
        sizes="48px"
        loading="lazy"
      />
    </div>
  );
}
