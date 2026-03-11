import Image from "next/image";

const COLORS = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-rose-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string) {
  const words = name.replace(/\b(LLC|Inc\.|Corp\.|PLLC|LP|Foundation|Co\.)\b/gi, "").trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return words[0].slice(0, 2).toUpperCase();
}

interface CompanyLogoProps {
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-9 h-9 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-16 h-16 text-lg",
};

const imgSizes = {
  sm: 36,
  md: 44,
  lg: 64,
};

export default function CompanyLogo({ name, logo, size = "md" }: CompanyLogoProps) {
  if (logo) {
    return (
      <div className={`${sizeClasses[size]} relative rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200`}>
        <Image
          src={logo}
          alt={name}
          width={imgSizes[size]}
          height={imgSizes[size]}
          className="object-contain w-full h-full p-1"
        />
      </div>
    );
  }

  const color = getColor(name);
  const initials = getInitials(name);

  return (
    <div
      className={`${sizeClasses[size]} ${color} rounded-xl flex items-center justify-center shrink-0`}
    >
      <span className="font-bold text-white leading-none">{initials}</span>
    </div>
  );
}
