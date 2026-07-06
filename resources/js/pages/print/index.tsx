import { Head } from '@inertiajs/react'

export default function PrintIndex() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Head title="Print Service" />
            <h1 className="text-2xl font-bold">Print Service</h1>
            <p className="text-gray-600">Upload and print your documents here.</p>
        </div>
    )
}
