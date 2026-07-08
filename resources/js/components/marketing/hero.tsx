import { Link } from '@inertiajs/react';
import { print } from '@/routes';

interface Stat {
    label: string;
    value: string;
}

interface Props {
    stats: Stat[];
}

export default function Hero({ stats }: Props) {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-20">
                <div className="flex flex-col items-center gap-12 md:flex-row">
                    <div className="flex-1">
                        <h1 className="text-5xl leading-tight font-bold text-[#0f172a]">
                            Next-Gen Industrial Print
                        </h1>
                        <p className="mt-4 text-xl text-slate-600">
                            Precision Engineering in Print.
                        </p>
                        <p className="mt-2 text-slate-500">
                            We combine industrial-grade hardware with software
                            precision to deliver high-volume printing solutions.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link
                                href={print().url}
                                className="rounded bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1e293b]"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="#"
                                className="rounded border border-[#0f172a] px-6 py-3 text-sm font-semibold text-[#0f172a] hover:bg-slate-50"
                            >
                                View Equipment
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="aspect-[4/3] rounded-lg bg-slate-100" />
                    </div>
                </div>
            </div>

            <div className="border-y border-slate-200 bg-slate-50">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-bold text-[#0f172a]">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
