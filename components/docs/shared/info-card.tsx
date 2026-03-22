interface InfoCardProps {
    title: string;
    icon: React.ReactNode;
    content: string;
}

export const InfoCard = ({ title, icon, content }: InfoCardProps) => (
    <div className="rounded-2xl border border-border/60 bg-card p-6 hover:border-secondary/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/8 border border-secondary/15 text-secondary">
                {icon}
            </div>
            <h3 className="text-[14px] font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
            {content}
        </p>
    </div>
);
