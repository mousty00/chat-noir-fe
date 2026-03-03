import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OperationCardProps {
    type: "QUERY" | "MUTATION";
    name: string;
    description: string;
    query: string;
    response?: string;
    variables?: object;
}

const typeColors: Record<string, string> = {
    QUERY: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    MUTATION: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export const OperationCard = ({ type, name, description, query, response, variables }: OperationCardProps) => (
    <div className="group rounded-2xl border border-border bg-secondary/5 p-6 hover:bg-secondary/10 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <Badge className={cn("px-3 py-1 text-[10px] font-mono border", typeColors[type])}>
                {type}
            </Badge>
            <code className="text-sm font-mono text-foreground tracking-tight">{name}</code>
        </div>
        <p className="text-xs text-muted-foreground font-mono mb-6 leading-relaxed">
            {description}
        </p>

        <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] ml-1">Gql Operation</p>
                <div className="relative group/code">
                    <pre className="p-4 rounded-xl bg-muted border border-border text-[10px] font-mono text-foreground overflow-x-auto shadow-inner">
                        {query}
                    </pre>
                </div>
            </div>

            {variables && (
                <div className="space-y-2">
                    <p className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] ml-1">Example Variables</p>
                    <div className="relative group/code">
                        <pre className="p-4 rounded-xl bg-muted border border-border text-[10px] font-mono text-foreground overflow-x-auto shadow-inner">
                            {JSON.stringify(variables, null, 4)}
                        </pre>
                    </div>
                </div>
            )}

            {response && (
                <div className="space-y-2">
                    <p className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] ml-1">Return Schema</p>
                    <div className="relative group/code">
                        <pre className="p-4 rounded-xl bg-muted border border-border text-[10px] font-mono text-foreground overflow-x-auto shadow-inner">
                            {response}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    </div>
);
