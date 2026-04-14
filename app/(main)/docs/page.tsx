"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    RiBookOpenLine,
    RiCodeSSlashLine,
    RiNodeTree
} from "react-icons/ri";
import { OverviewSection } from "@/components/docs/overview-section";
import { RestSection } from "@/components/docs/rest-section";
import { GraphQlSection } from "@/components/docs/graphql-section";

const sections = [
    { id: "overview", title: "Overview", icon: RiBookOpenLine },
    { id: "rest", title: "REST API", icon: RiCodeSSlashLine },
    { id: "graphql", title: "GraphQL", icon: RiNodeTree },
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("overview");

    return (
        <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="mb-10 pb-8 border-b border-border/40">
                <h1 className="text-2xl text-center font-semibold tracking-tight">Documentation</h1>
                <p className="text-[13px] text-center text-muted-foreground mt-1">
                    Everything you need to integrate with the cat archive. REST and GraphQL interfaces available.
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-muted text-[11px] text-muted-foreground font-medium">
                        v1.1.0
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-[11px] text-secondary font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        Live
                    </span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-52 shrink-0">
                    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 sticky top-6">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap",
                                    activeSection === section.id
                                        ? "bg-secondary/10 text-secondary border border-secondary/20"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                                )}
                            >
                                <section.icon className="h-4 w-4 shrink-0" />
                                {section.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 min-w-0">
                    {activeSection === "overview" && <OverviewSection />}
                    {activeSection === "rest" && <RestSection />}
                    {activeSection === "graphql" && <GraphQlSection />}
                </main>
            </div>
        </div>
    );
}
