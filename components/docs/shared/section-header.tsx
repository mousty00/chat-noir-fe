import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    description: string;
    className?: string;
}

export const SectionHeader = ({ title, description, className }: SectionHeaderProps) => (
    <div className={cn("space-y-2 mb-10", className)}>
        <h2 className="text-3xl font-sans font-black uppercase tracking-tighter text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">{description}</p>
        <div className="h-1 w-20 bg-secondary mt-4 rounded-full" />
    </div>
);
