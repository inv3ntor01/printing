import { Link } from '@inertiajs/react'
import { FileText, Search, Users, PenLine, BarChart3, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react'
import MarketingLayout from '@/layouts/marketing-layout'
import { requestQuote } from '@/routes'

const services = [
    {
        icon: <PenLine className="size-8" />,
        title: 'Professional Resume Writing',
        description: 'Chronological, functional, and hybrid resumes tailored to your industry. Our writers align your narrative with recruiter expectations and ATS algorithms.',
        stats: '92%',
        statLabel: 'Interview Rate',
    },
    {
        icon: <Search className="size-8" />,
        title: 'ATS Keyword Optimization',
        description: 'Advanced parsing analysis ensures your resume passes Applicant Tracking Systems. We reverse-engineer job descriptions to match the exact keywords and phrases.',
        stats: '98%',
        statLabel: 'ATS Pass Rate',
    },
    {
        icon: <Users className="size-8" />,
        title: 'Cover Letter & LinkedIn',
        description: 'Coordinated personal branding across your cover letter and LinkedIn profile. Consistent narrative, keyword alignment, and professional tone.',
        stats: '3x',
        statLabel: 'More Profile Views',
    },
]

const process = [
    {
        icon: <FileText className="size-10 text-[#06b6d4]" />,
        title: 'Consultation & Analysis',
        description: 'We review your career history, target roles, and industry trends. A deep dive into your professional journey to identify your unique value proposition.',
        step: '01',
    },
    {
        icon: <PenLine className="size-10 text-[#06b6d4]" />,
        title: 'Draft & Design',
        description: 'Our writers craft a tailored resume with modern formatting, ATS-compatible structure, and compelling achievement-driven bullet points.',
        step: '02',
    },
    {
        icon: <Star className="size-10 text-[#06b6d4]" />,
        title: 'Final Review & Delivery',
        description: 'You review the draft, request revisions, and approve the final version. Delivered in multiple formats: PDF, DOCX, and plain text.',
        step: '03',
    },
]

const features = [
    {
        icon: <BarChart3 className="size-6" />,
        title: 'Industry-Specific Expertise',
        description: 'Specialized writers for tech, finance, healthcare, creative, and executive roles.',
    },
    {
        icon: <CheckCircle className="size-6" />,
        title: 'Unlimited Revisions',
        description: 'Your satisfaction is guaranteed. Request as many revisions as you need within 30 days.',
    },
    {
        icon: <Shield className="size-6" />,
        title: 'Confidential & Secure',
        description: 'Your documents are encrypted and never shared. Full confidentiality throughout the process.',
    },
]

export default function ResumeCustomization() {
    return (
        <MarketingLayout>
            <section className="bg-[#0f172a] py-20">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-5xl font-bold text-white">Resume Customization</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                        Your career deserves more than a generic template. We engineer resumes that pass algorithms, impress recruiters, and land interviews.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10 px-4 py-1.5 text-sm font-medium text-[#06b6d4]">
                            <CheckCircle className="size-4" />
                            ATS-Optimized
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                            <CheckCircle className="size-4" />
                            Expert Writers
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
                            <CheckCircle className="size-4" />
                            48-Hour Turnaround
                        </span>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-[#0f172a]">Our Resume Services</h2>
                        <p className="mt-2 text-lg text-slate-500">End-to-end solutions for career advancement and professional branding.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {services.map((service) => (
                            <div key={service.title} className="group rounded-lg border border-slate-200 p-8 transition hover:border-[#06b6d4]/30 hover:shadow-lg">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#06b6d4]/10 text-[#06b6d4]">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#0f172a]">{service.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
                                <div className="mt-6 border-t border-slate-100 pt-4">
                                    <span className="text-2xl font-bold text-[#06b6d4]">{service.stats}</span>
                                    <span className="ml-1.5 text-sm text-slate-400">{service.statLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-[#0f172a]">How It Works</h2>
                        <p className="mt-2 text-lg text-slate-500">A streamlined three-step process from consultation to final delivery.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {process.map((step) => (
                            <div key={step.step} className="relative rounded-lg bg-white p-8 shadow-sm">
                                <span className="absolute right-4 top-4 text-4xl font-bold text-slate-100">{step.step}</span>
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[#06b6d4]/10">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-[#0f172a]">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-[#0f172a]">Why Choose VBTecH</h2>
                        <p className="mt-2 text-lg text-slate-500">We combine writing expertise with technical precision to deliver results.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.title} className="rounded-lg border border-slate-200 p-8 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#06b6d4]/10 text-[#06b6d4]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-[#0f172a]">{feature.title}</h3>
                                <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#0f172a] py-20">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-3xl font-bold text-white">Ready to Land Your Dream Job?</h2>
                    <p className="mt-3 text-lg text-slate-400">
                        Get a free consultation and quote. Our team will analyze your current resume and provide personalized recommendations.
                    </p>
                    <Link
                        href={requestQuote().url}
                        className="mt-8 inline-flex items-center gap-2 rounded bg-[#06b6d4] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#0891b2]"
                    >
                        Request a Quote
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </MarketingLayout>
    )
}
