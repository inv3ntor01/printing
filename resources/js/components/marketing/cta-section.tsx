import { Link } from '@inertiajs/react';

interface Cta {
    headline: string;
    subtext: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
}

interface Props {
    cta: Cta;
}

export default function CtaSection({ cta }: Props) {
    return (
        <section className="bg-[#0f172a] py-20">
            <div className="mx-auto max-w-3xl px-4 text-center">
                <h2 className="text-3xl font-bold text-white">
                    {cta.headline}
                </h2>
                <p className="mt-4 text-slate-300">{cta.subtext}</p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href={cta.primaryHref}
                        className="rounded bg-[#06b6d4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0891b2]"
                    >
                        {cta.primaryLabel}
                    </Link>
                    <Link
                        href={cta.secondaryHref}
                        className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                        {cta.secondaryLabel}
                    </Link>
                </div>
            </div>
        </section>
    );
}
