import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description: string;
    className?: string;
}

export const SectionHeader = ({ title, description, className }: SectionHeaderProps) => (
    <div className={cn("mb-8", className)}>
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">{title}</h2>
        <p className="mt-1.5 text-[14px] text-muted-foreground leading-relaxed">{description}</p>
        <div className="h-px w-full bg-border/50 mt-6" />
    </div>
);
