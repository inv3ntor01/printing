import MarketingLayout from '@/layouts/marketing-layout';

export default function PrintIndex() {
    return (
        <MarketingLayout>
            <div className="flex flex-col items-center justify-center gap-4 py-12">
                <h1 className="text-2xl font-bold">Print Service</h1>
                <p className="text-gray-600">
                    Upload and print your documents here.
                </p>
            </div>
        </MarketingLayout>
    );
}
