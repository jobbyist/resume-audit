import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className, showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Gradient circles inspired by Jobbyist logo */}
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
        <div className="absolute -right-2 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary opacity-80"></div>
      </div>
      {showText && (
        <span className="text-2xl font-bold text-foreground">
          ResumeAudit
        </span>
      )}
    </div>
  );
};