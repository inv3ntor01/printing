import { Head, Link, router, usePage } from '@inertiajs/react'
import { dashboard, services as servicesRoute, contactUs, login, privacy, terms, compliance, ip, requestQuote, resumeCustomization, logout as logoutRoute } from '@/routes'
import { ChevronDown } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface MarketingLayoutProps {
    children: ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    const { auth } = usePage().props as { auth: { user: { id: number; name: string; email: string } | null } }
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <Head title="VBTecH Solutions" />
            <header className="bg-sidebar text-sidebar-foreground">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <Link href="/" className="text-xl font-bold">
                        VBTecH Solutions
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href={servicesRoute().url} className="text-sm text-muted-foreground hover:text-white">Services</Link>
                        <Link href={resumeCustomization().url} className="text-sm text-muted-foreground hover:text-white">Resume</Link>
                        <Link href={requestQuote().url} className="text-sm text-muted-foreground hover:text-white">Get a Quote</Link>
                        <Link href={contactUs().url} className="text-sm text-muted-foreground hover:text-white">Contact Us</Link>
                    </nav>

                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-1 rounded big-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#0891b2]"
                            >
                                {auth.user.name}
                                <ChevronDown className="size-3" />
                            </button>
                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                                    <div className="absolute right-0 z-20 mt-1 w-44 rounded-md bg-popover py-1 shadow-lg ring-1 ring-black/5">
                                        <Link
                                            href={dashboard().url}
                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/settings/profile"
                                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <hr className="my-1 border-border" />
                                        <Link
                                            href={logoutRoute()}
                                            as="button"
                                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-accent"
                                            onClick={() => { setMenuOpen(false); router.flushAll() }}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link
                            href={login().url}
                            className="rounded big-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#0891b2]"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </header>

            <main>{children}</main>

            <footer className="bg-sidebar text-slate-400">
                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="grid gap-8 md:grid-cols-5">
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-sidebar-foreground">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#">About Us</Link></li>
                                <li><Link href="#">Sustainability</Link></li>
                                <li><Link href="#">Technology Partners</Link></li>
                                <li><Link href="#">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href={requestQuote().url}>Request a Quote</Link></li>
                                <li><Link href={servicesRoute().url}>Our Services</Link></li>
                                <li><Link href={contactUs().url}>Contact Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 text-sm font-semibold text-white">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href={privacy().url}>Privacy Policy</Link></li>
                                <li><Link href={terms().url}>Terms of Service</Link></li>
                                <li><Link href={compliance().url}>Data & Compliance (CCPA/GDPR)</Link></li>
                                <li><Link href={ip().url}>IP Infringement</Link></li>
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
                    <div className="mt-8 border-t border-border pt-8 text-center text-xs">
                        © {new Date().getFullYear()} VBTecH Solutions. Precision Engineering in Print.
                    </div>
                </div>
            </footer>
        </>
    )
}
