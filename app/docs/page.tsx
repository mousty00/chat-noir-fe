export default function DocsPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <section className="w-full mb-12 flex flex-col items-center justify-center retro-bevel p-1 bg-[#c0c0c0]">
                <div className="w-full bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-sm mb-4">
                    <span>READ_ME.TXT</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-[#00de1e] border border-white shadow-[1px_1px_black]" />
                        <div className="w-4 h-4 bg-[#f6ff00] border border-white shadow-[1px_1px_black]" />
                        <div className="w-4 h-4 bg-[#ff0000] border border-white shadow-[1px_1px_black]" />
                    </div>
                </div>
                <div className="p-12 font-mono text-left max-w-2xl text-black">
                    <h1 className="text-2xl font-bold mb-6 uppercase underline">Documentation v1.0</h1>
                    <p className="mb-4">Welcome to the Chat Noir API Terminal.</p>
                    <p className="mb-4">This interface provides access to the feline database.</p>
                    <div className="retro-bevel-inset p-4 bg-white mb-6">
                        <h2 className="font-bold mb-2 tracking-tighter uppercase">API Endpoints:</h2>
                        <ul className="list-disc ml-4 space-y-1">
                            <li>GET /cats - Retrieve all felines</li>
                            <li>GET /categories - Retrieve meta groups</li>
                        </ul>
                    </div>
                    <p className="opacity-50 text-xs">Last Updated: OCTOBER 1995</p>
                </div>
            </section>
        </div>
    );
}
