import { SectionHeader } from "./shared/section-header";
import { InfoCard } from "./shared/info-card";
import {
    RiCompassDiscoverLine,
    RiCodeSSlashLine,
    RiShieldCheckLine,
    RiKeyLine,
} from "react-icons/ri";

export const OverviewSection = () => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-2 duration-400 pb-20">
            <SectionHeader
                title="Overview"
                description="A fast, flexible API for cat data retrieval and media hosting."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                    title="Architecture"
                    icon={<RiCompassDiscoverLine className="h-4 w-4" />}
                    content="Built on a Spring Boot backend with PostgreSQL and S3 media storage, optimized for quick cat data retrieval and high-quality image hosting."
                />
                <InfoCard
                    title="Connectivity"
                    icon={<RiCodeSSlashLine className="h-4 w-4" />}
                    content="Access the archive via standard REST endpoints or flexible GraphQL queries. Both interfaces are fully supported and kept in sync."
                />
                <InfoCard
                    title="Authentication"
                    icon={<RiShieldCheckLine className="h-4 w-4" />}
                    content="JWT-based auth with support for username/password and Google OAuth. Protected endpoints require a Bearer token in the Authorization header."
                />
                <InfoCard
                    title="Authorization"
                    icon={<RiKeyLine className="h-4 w-4" />}
                    content="Role-based access control with USER and ADMIN tiers. Admin accounts can create, update and delete cat records."
                />
            </div>

            <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="px-6 py-5 border-b border-border/40 bg-muted/30">
                    <h3 className="text-[14px] font-semibold text-foreground">Base URLs</h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Use the appropriate endpoint for your integration type</p>
                </div>
                <div className="divide-y divide-border/40">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border bg-blue-500/8 text-blue-400 border-blue-500/20 shrink-0">
                            REST
                        </span>
                        <code className="text-[13px] font-mono text-foreground">
                            https://api.chatnoir.fun/api
                        </code>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border bg-purple-500/8 text-purple-400 border-purple-500/20 shrink-0">
                            GraphQL
                        </span>
                        <code className="text-[13px] font-mono text-foreground">
                            https://api.chatnoir.fun/api/graphql
                        </code>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/4 px-6 py-4">
                <p className="text-[13px] text-amber-400/90 leading-relaxed">
                    <span className="font-semibold">Authorization header:</span>{" "}
                    <code className="font-mono bg-amber-500/10 px-1.5 py-0.5 rounded text-[12px]">
                        Authorization: Bearer &lt;token&gt;
                    </code>
                    {" "}— required for all write operations and personal data endpoints.
                </p>
            </div>
        </div>
    );
};
