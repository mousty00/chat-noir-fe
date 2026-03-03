import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EndpointCardProps {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
    payload?: object;
    response?: object;
}

const methodColors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    POST: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    PUT: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    DELETE: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export const EndpointCard = ({ method, path, description, payload, response }: EndpointCardProps) => (
    <div className="group rounded-2xl border border-border bg-secondary/5 p-6 hover:bg-secondary/10 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <Badge className={cn("px-3 py-1 text-[10px] font-mono border", methodColors[method])}>
                {method}
            </Badge>
            <code className="text-sm font-mono text-foreground tracking-tight">{path}</code>
        </div>
        <p className="text-xs text-muted-foreground font-mono mb-6 leading-relaxed">
            {description}
        </p>

        {payload && (
            <div className="space-y-2 mb-4">
                <p className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] ml-1">Payload</p>
                <div className="relative group/code">
                    <pre className="p-4 rounded-xl bg-muted border border-border text-[10px] font-mono text-foreground overflow-x-auto shadow-inner">
                        {JSON.stringify(payload, null, 4)}
                    </pre>
                </div>
            </div>
        )}

        {response && (
            <div className="space-y-2">
                <p className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] ml-1">Response Sample</p>
                <div className="relative group/code">
                    <pre className="p-4 rounded-xl bg-muted border border-border text-[10px] font-mono text-foreground overflow-x-auto shadow-inner">
                        {JSON.stringify(response, null, 4)}
                    </pre>
                </div>
            </div>
        )}
    </div>
);
