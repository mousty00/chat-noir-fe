import { Cat } from "@/types/cat";
import { CatCard } from "./cat-card";

interface CatGridProps {
    cats: Cat[];
    onDownload: (id: string) => void;
    onView: (id: string) => void;
    downloadingId: string | null;
}

export const CatGrid = ({ cats, onDownload, onView, downloadingId }: CatGridProps) => {
    if (cats.length === 0) {
        return (
            <section className="text-center py-12">
                <p className="text-gray-500">No cats found</p>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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