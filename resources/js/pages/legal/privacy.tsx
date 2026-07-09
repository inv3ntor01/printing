import { Head } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Privacy() {
    return (
        <MarketingLayout>
            <Head title="Privacy Policy" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none space-y-4 text-sm leading-relaxed text-white">
                    <p>
                        VBTecH Solutions ("we," "our," or "us") is committed to
                        protecting your privacy. This Privacy Policy explains how
                        we collect, use, disclose, and safeguard your information
                        when you visit our website.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Information We Collect
                    </h2>
                    <p>
                        We collect personal information that you voluntarily
                        provide to us when you fill out a contact form, request a
                        quote, or communicate with us. This may include your name,
                        email address, phone number, and project details.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        How We Use Your Information
                    </h2>
                    <p>
                        We use the information we collect to respond to your
                        inquiries, provide our printing services, improve our
                        website, and send relevant communications with your
                        consent.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Data Protection
                    </h2>
                    <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal data against
                        unauthorized access, alteration, disclosure, or
                        destruction.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Contact Us
                    </h2>
                    <p>
                        If you have questions about this Privacy Policy, please
                        contact us at solutions@vbtech.com.
                    </p>
                </div>
            </div>
        </MarketingLayout>
    );
}
