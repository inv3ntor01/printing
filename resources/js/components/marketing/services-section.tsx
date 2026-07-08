import { FileText, Tag, Image, Truck, Type, CreditCard } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    fileText: <FileText className="size-6" />,
    tag: <Tag className="size-6" />,
    image: <Image className="size-6" />,
    truck: <Truck className="size-6" />,
    type: <Type className="size-6" />,
    creditCard: <CreditCard className="size-6" />,
};

interface Service {
    title: string;
    description: string;
    tags: string[];
    icon: string;
}

interface Props {
    services: Service[];
}

export default function ServicesSection({ services }: Props) {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-3xl font-bold text-[#0f172a]">
                    Core Print Services
                </h2>
                <p className="mt-2 text-slate-500">
                    Quality printing and document solutions tailored to your
                    needs.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="rounded-lg border border-slate-200 p-6"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-[#06b6d4]/10 text-[#06b6d4]">
                                {iconMap[service.icon]}
                            </div>
                            <h3 className="text-lg font-semibold text-[#0f172a]">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                {service.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
