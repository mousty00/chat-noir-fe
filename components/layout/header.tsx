import Image from "next/image";

export const Header = () => {
    return (
        <section className="w-full mb-8 text-center flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
                <h1 className="text-4xl max-sm:text-3xl font-bold tracking-tight mb-2">
                    Chat Noir API
                </h1>
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    className="max-sm:hidden"
                    width={60}
                    height={60}
                />
            </div>
            <p className="text-lg text-gray-600">
                Discover our collection of amazing cats
            </p>
        </section>
    );
};