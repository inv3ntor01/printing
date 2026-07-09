import { Head } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Terms() {
    return (
        <MarketingLayout>
            <Head title="Terms of Service" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
                <div className="prose prose-slate max-w-none space-y-4 text-sm leading-relaxed text-white">
                    <p>
                        By accessing or using the VBTecH Solutions website and
                        services, you agree to be bound by these Terms of Service.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Use of Services
                    </h2>
                    <p>
                        You agree to use our services only for lawful purposes and
                        in accordance with these terms. You are responsible for
                        ensuring that any information you provide is accurate and
                        complete.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Intellectual Property
                    </h2>
                    <p>
                        All content, designs, and materials on this website are
                        the property of VBTecH Solutions and are protected by
                        applicable intellectual property laws.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Limitation of Liability
                    </h2>
                    <p>
                        VBTecH Solutions shall not be liable for any direct,
                        indirect, incidental, or consequential damages arising
                        from your use of our website or services.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Changes to Terms
                    </h2>
                    <p>
                        We reserve the right to modify these terms at any time.
                        Changes will be effective immediately upon posting to
                        this page.
                    </p>
                </div>
            </div>
        </MarketingLayout>
    );
}
