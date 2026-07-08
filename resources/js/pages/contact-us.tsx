import { useForm } from '@inertiajs/react'
import MarketingLayout from '@/layouts/marketing-layout'
import { MapPin, Phone, Upload } from 'lucide-react'

interface Props {
    jobTypes: string[]
}

export default function ContactUs({ jobTypes }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        contact: '',
        job_type: '',
        quantity: '',
        specifications: '',
        requirements: '',
        file: null as File | null,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/contact-us')
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
                        <h1 className="text-3xl font-bold text-[#0f172a]">Message Sent!</h1>
                        <p className="mt-3 text-slate-500">Thank you for reaching out. We'll get back to you shortly.</p>
                    </div>
                </section>
            </MarketingLayout>
        )
    }

    return (
        <MarketingLayout>
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-[#0f172a]">Contact Us</h1>
                        <p className="mt-2 text-lg text-slate-500">
                            Send us a message or request a quote. We'll get back to you with a price and turnaround time.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2" encType="multipart/form-data">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-[#0f172a]">Full Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-[#0f172a]">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-contact" className="mb-1 block text-sm font-medium text-[#0f172a]">Contact Number</label>
                                    <input
                                        id="contact-contact"
                                        type="tel"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-job-type" className="mb-1 block text-sm font-medium text-[#0f172a]">Job Type</label>
                                    <select
                                        id="contact-job-type"
                                        value={data.job_type}
                                        onChange={(e) => setData('job_type', e.target.value)}
                                        required
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    >
                                        <option value="">Select a service</option>
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.job_type && <p className="mt-1 text-xs text-red-500">{errors.job_type}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-quantity" className="mb-1 block text-sm font-medium text-[#0f172a]">Quantity</label>
                                    <input
                                        id="contact-quantity"
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        required
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    />
                                    {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
                                </div>
                                <div>
                                    <label htmlFor="contact-specs" className="mb-1 block text-sm font-medium text-[#0f172a]">Paper / Specifications</label>
                                    <input
                                        id="contact-specs"
                                        type="text"
                                        value={data.specifications}
                                        onChange={(e) => setData('specifications', e.target.value)}
                                        placeholder="e.g. A4, glossy, 250gsm"
                                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-file" className="mb-1 block text-sm font-medium text-[#0f172a]">Upload File (optional)</label>
                                <label htmlFor="contact-file" className="flex cursor-pointer items-center gap-2 rounded border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-500 hover:border-[#06b6d4]">
                                    <Upload className="size-4" />
                                    <span>{data.file ? data.file.name : 'Click to upload PDF, Word, or image'}</span>
                                    <input
                                        id="contact-file"
                                        type="file"
                                        onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                </label>
                                {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                            </div>

                            <div>
                                <label htmlFor="contact-requirements" className="mb-1 block text-sm font-medium text-[#0f172a]">Additional Requirements</label>
                                <textarea
                                    id="contact-requirements"
                                    rows={4}
                                    value={data.requirements}
                                    onChange={(e) => setData('requirements', e.target.value)}
                                    placeholder="Describe your project, deadline, and any special instructions..."
                                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-[#06b6d4] focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        <aside className="space-y-8">
                            <div className="rounded-lg border border-slate-200 p-6">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Contact</h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 size-4 shrink-0 text-[#06b6d4]" />
                                        <span className="text-slate-600">HQ Engineering Hub, Silicon Valley</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="mt-0.5 size-4 shrink-0 text-[#06b6d4]" />
                                        <div>
                                            <div className="text-slate-600">+1 (800) PRINT-TECH</div>
                                            <div className="text-xs text-slate-400">Mon - Fri: 08:00 - 19:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 p-6">
                                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                                    Turnaround
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <div className="font-medium text-[#0f172a]">Standard</div>
                                        <div className="mt-0.5 text-slate-500">3 - 5 business days</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-[#0f172a]">Express</div>
                                        <div className="mt-0.5 text-slate-500">24 - 48 hours (surcharge applies)</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-[#0f172a]">Bulk Orders</div>
                                        <div className="mt-0.5 text-slate-500">Quoted individually based on volume</div>
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
