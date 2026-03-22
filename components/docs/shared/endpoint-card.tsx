import { cn } from "@/lib/utils";

interface EndpointCardProps {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
    payload?: object;
    response?: object;
}

const methodConfig: Record<string, { label: string; classes: string }> = {
    GET:    { label: "GET",    classes: "bg-blue-500/8 text-blue-400 border-blue-500/20" },
    POST:   { label: "POST",   classes: "bg-emerald-500/8 text-emerald-400 border-emerald-500/20" },
    PUT:    { label: "PUT",    classes: "bg-amber-500/8 text-amber-400 border-amber-500/20" },
    DELETE: { label: "DELETE", classes: "bg-rose-500/8 text-rose-400 border-rose-500/20" },
};

export const EndpointCard = ({ method, path, description, payload, response }: EndpointCardProps) => {
    const cfg = methodConfig[method];
    return (
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden transition-all hover:border-border">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-border/40 bg-muted/30">
                <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border tracking-wider shrink-0",
                    cfg.classes
                )}>
                    {cfg.label}
                </span>
                <code className="text-[14px] font-mono text-foreground">{path}</code>
            </div>

            <div className="px-5 py-4 space-y-4">
                <p className="text-[13px] text-muted-foreground leading-relaxed">{description}</p>

                {payload && (
                    <div className="space-y-1.5">
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Request body</p>
                        <pre className="p-4 rounded-xl bg-muted/60 border border-border/60 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed">
                            {JSON.stringify(payload, null, 2)}
                        </pre>
                    </div>
                )}

                {response && (
                    <div className="space-y-1.5">
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Response</p>
                        <pre className="p-4 rounded-xl bg-muted/60 border border-border/60 text-[12px] font-mono text-foreground overflow-x-auto leading-relaxed">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
