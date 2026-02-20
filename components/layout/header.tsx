import Image from "next/image";

export const Header = () => {
    return (
        <section className="w-full mb-12 flex flex-col items-center justify-center retro-bevel mt-0 bg-[#c0c0c0]">
            <div className="w-full bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-sm mb-4">
                <span>CHAT_NOIR.EXE</span>
                <div className="flex gap-1">
                    <div className="w-4 h-4 bg-[#00de1e] border border-white shadow-[1px_1px_black]" />
                    <div className="w-4 h-4 bg-[#f6ff00] border border-white shadow-[1px_1px_black]" />
                    <div className="w-4 h-4 bg-[#ff0000] border border-white shadow-[1px_1px_black]" />
                </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col items-center w-full">
                <div className="flex items-center gap-4 md:gap-6 mb-4 flex-wrap justify-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase italic text-center">
                        Chat Noir API
                    </h1>
                    <div className="retro-bevel p-1 bg-white shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            className="aspect-square grayscale contrast-125 w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
                <p className="text-sm md:text-xl text-black font-bold border-t-2 border-black pt-2 uppercase tracking-widest text-center">
                    Cat Collection
                </p>
            </div>
        </section>
    );
};