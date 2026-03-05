"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    RiArrowRightSLine,
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
    { id: "graphql", title: "GraphQL API", icon: RiNodeTree },
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState("overview");

    return (
        <div className="w-full overflow-x-hidden max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            <aside className="lg:w-64 flex flex-col gap-2 shrink-0">
                <div className="px-5 py-10 mb-6 border-l-2 border-secondary/20 bg-secondary/5 rounded-r-2xl">
                    <h1 className="text-2xl font-sans font-black tracking-tighter text-foreground uppercase leading-none mb-1">
                        DOCS
                    </h1>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Version v1.1.0</p>
                </div>

                <nav className="flex flex-col gap-1 pr-4">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-4 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all group border border-transparent",
                                activeSection === section.id
                                    ? "bg-secondary text-white shadow-xl shadow-secondary/10 border-white/5"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <section.icon className={cn(
                                "h-4 w-4 transition-transform group-hover:scale-110",
                                activeSection === section.id ? "text-white" : "text-secondary/50"
                            )} />
                            {section.title}
                            {activeSection === section.id && <RiArrowRightSLine className="ml-auto animate-in fade-in slide-in-from-left-2" />}
                        </button>
                    ))}
                </nav>
            </aside>


            <main className="flex-1 min-w-0">
                <div className="relative">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-[160px] pointer-events-none" />

                    {activeSection === "overview" && <OverviewSection />}
                    {activeSection === "rest" && <RestSection />}
                    {activeSection === "graphql" && <GraphQlSection />}
                </div>
            </main>
        </div>
    );
}
