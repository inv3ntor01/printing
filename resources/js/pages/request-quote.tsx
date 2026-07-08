import { useForm, usePage } from '@inertiajs/react'
import { MapPin, Phone, Upload, Navigation } from 'lucide-react'
import MarketingLayout from '@/layouts/marketing-layout'

interface Props {
    jobTypes: string[]
}

export default function RequestQuote({ jobTypes }: Props) {
    const { auth } = usePage().props as { auth: { user: { id: number; name: string; email: string } | null } }

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: auth.user?.name ?? '',
        email: auth.user?.email ?? '',
        contact: '',
        job_type: '',
        quantity: '',
        paper_stock: '',
        width: '',
        height: '',
        pages: '',
        requirements: '',
        file: null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/request-quote')
    }

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) setData('file', droppedFile)
    }

    if (recentlySuccessful) {
        return (
            <MarketingLayout>
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-lg px-4 text-center">
                        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-100">
                            <svg className="size-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-[#0f172a]">Quote Request Sent!</h1>
                        <p className="mt-3 text-black">
                            We've received your technical specifications and will get back to you within 24 hours with a precise engineering estimate.
                        </p>
                    </div>
                </section>
            </MarketingLayout>
        )
    }

    return (
        <MarketingLayout>
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-[#0f172a]">Request a Technical Quote</h1>
                                <p className="mt-2 text-lg text-black">
                                    Provide your technical specifications below for a precise engineering estimate from our production specialists.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                {!auth.user && (
                                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">Contact Information</h2>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div>
                                                <label htmlFor="quote-name" className="mb-1 block text-sm font-medium text-black">Full Name</label>
                                                <input
                                                    id="quote-name"
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    required
                                                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                                />
                                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="quote-email" className="mb-1 block text-sm font-medium text-black">Email</label>
                                                <input
                                                    id="quote-email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                                />
                                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="quote-contact" className="mb-1 block text-sm font-medium text-black">Contact Number</label>
                                                <input
                                                    id="quote-contact"
                                                    type="tel"
                                                    value={data.contact}
                                                    onChange={(e) => setData('contact', e.target.value)}
                                                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="quote-job-type" className="mb-1 block text-sm font-medium text-black">Job Type</label>
                                    <select
                                        id="quote-job-type"
                                        value={data.job_type}
                                        onChange={(e) => setData('job_type', e.target.value)}
                                        required
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                    >
                                        <option value="">Select a job type</option>
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.job_type && <p className="mt-1 text-xs text-red-500">{errors.job_type}</p>}
                                </div>

                                <div>
                                    <label htmlFor="quote-quantity" className="mb-1 block text-sm font-medium text-black">Quantity</label>
                                    <input
                                        id="quote-quantity"
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        required
                                        placeholder="e.g. 1000"
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                    />
                                    {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
                                </div>

                                <div>
                                    <label htmlFor="quote-paper-stock" className="mb-1 block text-sm font-medium text-black">Paper Stock & Weight (GSM)</label>
                                    <input
                                        id="quote-paper-stock"
                                        type="text"
                                        value={data.paper_stock}
                                        onChange={(e) => setData('paper_stock', e.target.value)}
                                        placeholder="e.g. Uncoated 120gsm, Gloss 250gsm"
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label htmlFor="quote-width" className="mb-1 block text-sm font-medium text-black">Width (mm)</label>
                                        <input
                                            id="quote-width"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={data.width}
                                            onChange={(e) => setData('width', e.target.value)}
                                            placeholder="e.g. 210"
                                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quote-height" className="mb-1 block text-sm font-medium text-black">Height (mm)</label>
                                        <input
                                            id="quote-height"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            placeholder="e.g. 297"
                                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="quote-pages" className="mb-1 block text-sm font-medium text-black">Pages / Sides</label>
                                        <input
                                            id="quote-pages"
                                            type="number"
                                            min="1"
                                            value={data.pages}
                                            onChange={(e) => setData('pages', e.target.value)}
                                            placeholder="e.g. 4"
                                            className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-black">Specification File / Artwork (Max 50MB)</label>
                                    <div
                                        onDrop={handleFileDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-[#06b6d4]"
                                        onClick={() => document.getElementById('quote-file')?.click()}
                                    >
                                        <Upload className="mb-3 size-8 text-slate-400" />
                                        <p className="text-sm text-black">
                                            {data.file ? (
                                                <span className="font-medium text-black">{data.file.name}</span>
                                            ) : (
                                                <>Drop PDF, AI, or CAD files here or <span className="font-semibold text-[#06b6d4]">Browse</span></>
                                            )}
                                        </p>
                                        <input
                                            id="quote-file"
                                            type="file"
                                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ai,.psd,.eps"
                                        />
                                    </div>
                                    {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                                </div>

                                <div>
                                    <label htmlFor="quote-requirements" className="mb-1 block text-sm font-medium text-black">Project Requirements & Finishing</label>
                                    <textarea
                                        id="quote-requirements"
                                        rows={4}
                                        value={data.requirements}
                                        onChange={(e) => setData('requirements', e.target.value)}
                                        placeholder="Describe finishing requirements, binding, foil, spot UV, deadlines, or any special instructions..."
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-black focus:border-[#06b6d4] focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Submitting...' : 'Submit Quote Request'}
                                </button>
                            </form>
                        </div>

                        <aside className="space-y-8 lg:col-span-5">
                            <div className="rounded-lg border border-slate-200 p-6">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 size-5 shrink-0 text-[#06b6d4]" />
                                    <div>
                                        <h3 className="font-semibold text-black">Global Headquarters</h3>
                                        <p className="mt-1 text-sm text-black">
                                            Industrial Sector 7, Tech Park East<br />
                                            High-Precision Zone, London E14 5HQ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 p-6">
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 size-5 shrink-0 text-[#06b6d4]" />
                                    <div>
                                        <h3 className="font-semibold text-black">Direct Production Line</h3>
                                        <p className="mt-1 text-sm text-black">+44 (0) 20 7946 0123</p>
                                        <p className="text-xs text-black">Mon - Fri: 08:00 - 19:00 GMT</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-slate-200 p-4 text-sm font-semibold text-[#06b6d4] transition hover:bg-slate-50"
                            >
                                <Navigation className="size-4" />
                                Get Directions
                            </a>

                            <div className="rounded-lg border border-slate-200 p-6">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">Turnaround & Logistics</h3>
                                <div className="space-y-5 text-sm">
                                    <div>
                                        <div className="font-medium text-black">Standard Technical Production</div>
                                        <p className="mt-0.5 text-black">
                                            3 - 5 business days after artwork approval. This applies to most litho and digital runs.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="font-medium text-black">Precision Finishing & Die-Cutting</div>
                                        <p className="mt-0.5 text-black">
                                            5 - 8 business days. Complex jobs involving foil, spot UV, or custom dies require extended curing and set-up times.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="font-medium text-black">Express Engineering Service</div>
                                        <p className="mt-0.5 text-black">
                                            24 - 48 hour turnaround available for specific digital and wide-format requirements. Surcharges apply.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    )
}
