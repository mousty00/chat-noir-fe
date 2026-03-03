import { SectionHeader } from "./shared/section-header";
import { InfoCard } from "./shared/info-card";
import {
    RiCompassDiscoverLine,
    RiCodeSSlashLine,
    RiInformationLine,
    RiArrowRightLine
} from "react-icons/ri";

export const OverviewSection = () => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <SectionHeader
                title="API Overview"
                description="General guide for interacting with the Chat Noir system."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                    title="Architecture"
                    icon={<RiCompassDiscoverLine className="text-secondary" />}
                    content="Our system is built on a fast architecture optimized for quick cat data retrieval and high-quality image hosting."
                />
                <InfoCard
                    title="Connectivity"
                    icon={<RiCodeSSlashLine className="text-secondary" />}
                    content="Access the archive via standard REST endpoints or flexible GraphQL queries for efficient data lookups."
                />
            </div>

            <div className="p-8 rounded-2xl border border-secondary/20 bg-secondary/5 backdrop-blur-sm space-y-6">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-3">
                    <RiInformationLine className="text-secondary h-5 w-5" />
                    API PROTOCOLS
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3 p-5 rounded-xl border border-border bg-background/50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 bg-secondary rounded-full" />
                            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest font-black">REST API</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-4 italic">
                            Standard API communication for general data tasks.
                        </p>
                        <code className="block text-[10px] font-mono p-3 bg-muted rounded border border-border text-foreground leading-none">
                            https://api.chat-noir.io/v1
                        </code>
                    </div>

                    <div className="space-y-3 p-5 rounded-xl border border-border bg-background/50">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1.5 w-1.5 bg-purple-500 rounded-full" />
                            <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest font-black">GraphQL API</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-4 italic">
                            Modern query language for precise and flexible data fetching.
                        </p>
                        <code className="block text-[10px] font-mono p-3 bg-muted rounded border border-border text-foreground leading-none">
                            https://api.chat-noir.io/v1/graphql
                        </code>
                    </div>
                </div>

            </div>
        </div>
    );
};
