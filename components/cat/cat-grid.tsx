import { Cat } from "@/types/cat";
import { CatCard } from "./cat-card";
import { CircleXIcon } from "lucide-react";

interface CatGridProps {
    cats: Cat[];
    onDownload: (id: string) => void;
    onView: (id: string) => void;
    downloadingId: string | null;
}

export const CatGrid = ({ cats, onDownload, onView, downloadingId }: CatGridProps) => {
    if (cats.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-300">
                <CircleXIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                <p className="text-xl font-medium text-muted-foreground">No cats found</p>
                <p className="text-sm text-muted-foreground/60">Try adjusting your search or filters</p>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {cats.map((cat) => (
                <CatCard
                    key={cat.id}
                    cat={cat}
                    onDownload={onDownload}
                    onView={onView}
                    isDownloading={downloadingId === cat.id}
                />
            ))}
        </section>
    );
};