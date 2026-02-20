export default function CategoriesPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full mb-12 flex flex-col items-center justify-center retro-bevel p-1 bg-[#c0c0c0]">
                <div className="w-full bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-sm mb-4">
                    <span>CATEGORIES.EXE</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-[#00de1e] border border-white shadow-[1px_1px_black]" />
                        <div className="w-4 h-4 bg-[#f6ff00] border border-white shadow-[1px_1px_black]" />
                        <div className="w-4 h-4 bg-[#ff0000] border border-white shadow-[1px_1px_black]" />
                    </div>
                </div>
                <div className="p-12 text-center">
                    <h1 className="text-4xl font-black text-black uppercase italic mb-4">Under Construction</h1>
                    <p className="text-black font-bold border-t-2 border-black pt-2 uppercase tracking-widest">
                        ERROR 404
                    </p>
                </div>
            </section>
        </div>
    );
}
