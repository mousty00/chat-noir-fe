import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
    title: string;
    icon: React.ReactNode;
    content: string;
}

export const InfoCard = ({ title, icon, content }: InfoCardProps) => (
    <Card className="bg-secondary/5 border-white/5 hover:border-secondary/30 transition-all duration-500">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-lg bg-secondary/10 border border-white/5 shadow-inner">
                {icon}
            </div>
            <CardTitle className="text-xs uppercase tracking-widest font-mono text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                {content}
            </p>
        </CardContent>
    </Card>
);
