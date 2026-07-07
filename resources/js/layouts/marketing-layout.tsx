import { Head, Link } from '@inertiajs/react'
import { services as servicesRoute } from '@/routes'
import type { ReactNode } from 'react'

interface MarketingLayoutProps {
    children: ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <>
            <Head title="VBTecH Solutions" />
            <header className="bg-[#0f172a] text-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <Link href="/" className="text-xl font-bold">
                        VBTecH Solutions
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href={servicesRoute().url} className="text-sm text-slate-300 hover:text-white">Services</Link>
                        <Link href="#" className="text-sm text-slate-300 hover:text-white">Solutions</Link>
                        <Link href="#" className="text-sm text-slate-300 hover:text-white">Equipment</Link>
                        <Link href="#" className="text-sm text-slate-300 hover:text-white">Contact Us</Link>
                    </nav>

                    <Link
                        href="#"
                        className="rounded bg-[#06b6d4] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0891b2]"
                    >
                        Request Quote
                    </Link>
                </div>
            </header>

            <main>{children}</main>

            <footer className="bg-[#0f172a] text-slate-400">
                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#">About Us</Link></li>
                                <li><Link href="#">Sustainability</Link></li>
                                <li><Link href="#">Technology Partners</Link></li>
                                <li><Link href="#">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Services</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#">Commercial Digital</Link></li>
                                <li><Link href="#">Bulk Offset</Link></li>
                                <li><Link href="#">Variable Data</Link></li>
                                <li><Link href="#">Precision Finishing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Contact</h3>
                            <ul className="space-y-2 text-sm">
                                <li>HQ Engineering Hub, Silicon Valley</li>
                                <li>solutions@vbtech.com</li>
                                <li>+1 (800) PRINT-TECH</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">VBTecH</h3>
                            <p className="text-sm">
                                Precision engineering solutions for the modern print landscape. Reliability at scale.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-700 pt-8 text-center text-xs">
                        © 2024 VBTecH Solutions. Precision Engineering in Print.
                    </div>
                </div>
            </footer>
        </>
    )
}
