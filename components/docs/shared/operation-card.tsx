import { cn } from "@/lib/utils";

interface OperationCardProps {
    type: "QUERY" | "MUTATION";
    name: string;
    description: string;
    query: string;
    response?: string;
    variables?: object;
}

const typeConfig: Record<string, string> = {
    QUERY:    "bg-blue-500/8 text-blue-400 border-blue-500/20",
    MUTATION: "bg-purple-500/8 text-purple-400 border-purple-500/20",
};

export const OperationCard = ({ type, name, description, query, response, variables }: OperationCardProps) => (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden transition-all hover:border-border">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-border/40 bg-muted/30">
            <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border tracking-wider shrink-0",
                typeConfig[type]
            )}>
                {type}
            </span>
            <code className="text-[14px] font-mono text-foreground">{name}</code>
        </div>

        <div className="px-5 py-4 space-y-4">
            <p className="text-[13px] text-muted-foreground leading-relaxed">{description}</p>

            <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Operation</p>
                <pre className="p-4 rounded-xl bg-muted/60 border border-border/60 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed">
                    {query}
                </pre>
            </div>

            {variables && (
                <div className="space-y-1.5">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Variables</p>
                    <pre className="p-4 rounded-xl bg-muted/60 border border-border/60 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed">
                        {JSON.stringify(variables, null, 2)}
                    </pre>
                </div>
            )}

            {response && (
                <div className="space-y-1.5">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Response schema</p>
                    <pre className="p-4 rounded-xl bg-muted/60 border border-border/60 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed">
                        {response}
                    </pre>
                </div>
            )}
        </div>
    </div>
);
