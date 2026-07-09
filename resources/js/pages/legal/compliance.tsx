import { Head } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Compliance() {
    return (
        <MarketingLayout>
            <Head title="Data & Compliance" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold">
                    Data & Compliance (CCPA/GDPR)
                </h1>
                <div className="prose prose-slate max-w-none space-y-4 text-sm leading-relaxed text-white">
                    <p>
                        VBTecH Solutions is committed to compliance with the
                        California Consumer Privacy Act (CCPA) and the General
                        Data Protection Regulation (GDPR).
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Your Rights
                    </h2>
                    <p>
                        Depending on your jurisdiction, you may have the right to
                        access, correct, delete, or port your personal data. You
                        may also have the right to restrict or object to certain
                        processing activities.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Data Retention
                    </h2>
                    <p>
                        We retain your personal data only for as long as necessary
                        to fulfill the purposes for which it was collected,
                        including legal, accounting, or reporting requirements.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Exercising Your Rights
                    </h2>
                    <p>
                        To exercise your rights under CCPA or GDPR, please
                        contact us at solutions@vbtech.com. We will respond to
                        your request within the timeframe required by applicable
                        law.
                    </p>
                </div>
            </div>
        </MarketingLayout>
    );
}
