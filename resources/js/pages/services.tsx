import MarketingLayout from '@/layouts/marketing-layout'
import { FileText, Tag, Image, Truck, Type, CreditCard } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { services as servicesRoute } from '@/routes'

const iconMap: Record<string, React.ReactNode> = {
    fileText: <FileText className="size-8" />,
    tag: <Tag className="size-8" />,
    image: <Image className="size-8" />,
    truck: <Truck className="size-8" />,
    type: <Type className="size-8" />,
    creditCard: <CreditCard className="size-8" />,
}

interface ServiceItem {
    title: string
    description: string
    features: string[]
    icon: string
}

interface PageProps {
    services: ServiceItem[]
}

export default function Services({ services }: PageProps) {
    return (
        <MarketingLayout>
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-[#0f172a]">Our Services</h1>
                        <p className="mt-2 text-lg text-slate-500">
                            Quality printing and document solutions tailored to your needs.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="rounded-lg border border-slate-200 p-8"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#06b6d4]/10 text-[#06b6d4]">
                                    {iconMap[service.icon]}
                                </div>
                                <h2 className="text-xl font-semibold text-[#0f172a]">{service.title}</h2>
                                <p className="mt-2 text-sm text-slate-500">{service.description}</p>
                                <ul className="mt-4 space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                                            <span className="mt-0.5 text-[#06b6d4]">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={servicesRoute().url}
                                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#06b6d4] hover:underline"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MarketingLayout>
    )
}
