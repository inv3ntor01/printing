import { Head } from '@inertiajs/react';
import MarketingLayout from '@/layouts/marketing-layout';

export default function Ip() {
    return (
        <MarketingLayout>
            <Head title="IP Infringement" />
            <div className="mx-auto max-w-3xl px-4 py-12">
                <h1 className="mb-6 text-3xl font-bold">
                    Intellectual Property Infringement
                </h1>
                <div className="prose prose-slate max-w-none space-y-4 text-sm leading-relaxed text-white">
                    <p>
                        VBTecH Solutions respects the intellectual property rights
                        of others and expects our users to do the same.
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                        Reporting Infringement
                    </h2>
                    <p>
                        If you believe that any content on our website infringes
                        your copyright, trademark, or other intellectual property
                        rights, please notify us with the following information:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>
                            A description of the copyrighted work or other
                            intellectual property you claim has been infringed
                        </li>
                        <li>
                            A description of where the infringing material is
                            located on our website
                        </li>
                        <li>
                            Your contact information, including name, address,
                            phone number, and email address
                        </li>
                        <li>
                            A statement that you have a good faith belief that the
                            use is not authorized
                        </li>
                        <li>
                            A statement, under penalty of perjury, that the
                            information in your notice is accurate
                        </li>
                    </ul>
                    <h2 className="text-lg font-semibold text-white">
                        Contact
                    </h2>
                    <p>
                        Please send infringement notices to solutions@vbtech.com.
                    </p>
                </div>
            </div>
        </MarketingLayout>
    );
}
