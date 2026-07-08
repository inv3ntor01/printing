import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dashboard } from '@/routes';

type Order = {
    id: number;
    name: string;
    email: string;
    contact: string | null;
    job_type: string;
    quantity: number;
    specifications: string | null;
    file_path: string | null;
    original_filename: string | null;
    requirements: string | null;
    status: string;
    quote_amount: string | null;
    quoted_at: string | null;
    created_at: string;
    updated_at: string;
    user: {id: number; name: string; email: string};
};

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    quoted: 'default',
    approved: 'default',
    in_production: 'default',
    shipping: 'outline',
    delivered: 'outline',
    cancelled: 'destructive',
};

export default function Show({ order }: { order: Order }) {
    return (
        <>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-6">

                <div className='flex items-center justify-between'>
                    <Heading
                        variant="small"
                        title={`Order #${order.id}`}
                        description={`Submitted ${new Date(order.created_at).toLocaleString()}`}
                    />
                    <Link href={dashboard().url}>
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <div className="p-6">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Customer Information
                        </h3>
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Name</dt>
                                <dd className="font-medium">{order.name}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd className="font-medium">{order.email}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Contact</dt>
                                <dd className="font-medium">{order.contact ?? '-'}</dd>
                            </div>
                            {order.user && (
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Account</dt>
                                    <dd className="font-medium">{order.user.name}</dd>
                                </div>
                            )}
                        </dl>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Order Details
                            </h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Job Type</dt>
                                    <dd className="font-medium">{order.job_type}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Quantity</dt>
                                    <dd className="font-medium">{order.quantity}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Specifications</dt>
                                    <dd className="font-medium">{order.specifications ?? '-'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Status</dt>
                                    <dd>
                                        <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                                            {order.status.replace(/_/g, ' ')}
                                        </Badge>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Quote Amount</dt>
                                    <dd className="font-medium">{order.quote_amount ? `$${order.quote_amount}` : 'Not quoted'}</dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                </div>

                {order.requirements && (
                    <Card>
                        <div className="p-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Requirements
                            </h3>
                            <p className="whitespace-pre-wrap text-sm">{order.requirements}</p>
                        </div>
                    </Card>
                )}

                {order.file_path && (
                    <Card>
                        <div className="p-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Uploaded File
                            </h3>
                            <p className="text-sm">{order.original_filename}</p>
                            <a
                                href={`/storage/${order.file_path}`}
                                className="mt-2 inline-block text-sm text-[#06b6d4] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download File
                            </a>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Order Detail',
            href: '#',
        },
    ],
};
