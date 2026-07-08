import { ShieldCheck, Zap, Cpu } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    shieldCheck: <ShieldCheck className="size-8" />,
    zap: <Zap className="size-8" />,
    cpu: <Cpu className="size-8" />,
};

interface Advantage {
    title: string;
    description: string;
    icon: string;
}

interface Props {
    advantages: Advantage[];
}

export default function AdvantageSection({ advantages }: Props) {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-[#0f172a]">
                    The VBTecH Advantage
                </h2>
                <p className="mt-2 text-slate-500">
                    Reliability Engineered into Every Micron.
                </p>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {advantages.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-lg bg-white p-8"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#06b6d4]/10 text-[#06b6d4]">
                                {iconMap[item.icon]}
                            </div>
                            <h3 className="text-xl font-semibold text-[#0f172a]">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
