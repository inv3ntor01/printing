import { Head, Link } from '@inertiajs/react';
import { FileImage, FileText } from 'lucide-react';
import CommentSection from '@/components/comment-section';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface Comment {
    id: number;
    user: { id: number; name: string };
    body: string;
    created_at: string;
}

type Order = {
    id: number;
    name: string;
    email: string;
    contact: string | null;
    job_type: string;
    quantity: number;
    specifications: string | null;
    paper_stock: string | null;
    width: string | number | null;
    height: string | number | null;
    pages: string | number | null;
    file_path: string | null;
    original_filename: string | null;
    requirements: string | null;
    status: string;
    quote_amount: string | null;
    quoted_at: string | null;
    created_at: string;
    updated_at: string;
    user: { id: number; name: string; email: string };
};

const isImageFile = (filename: string) =>
    /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i.test(filename);

const statusVariant: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    pending: 'secondary',
    quoted: 'default',
    approved: 'default',
    in_production: 'default',
    shipping: 'outline',
    delivered: 'outline',
    cancelled: 'destructive',
};

export default function Show({ order, comments }: { order: Order; comments: Comment[] }) {
    return (
        <>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title={`Order #${order.id}`}
                        description={`Submitted ${new Date(order.created_at).toLocaleString()}`}
                    />
                    <Link href={dashboard().url} className="shrink-0">
                        <Button variant="outline" className="w-full sm:w-auto">Back to Dashboard</Button>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <div className="p-6">
                            <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                Customer Information
                            </h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Name
                                    </dt>
                                    <dd className="font-medium">
                                        {order.name}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Email
                                    </dt>
                                    <dd className="font-medium">
                                        {order.email}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Contact
                                    </dt>
                                    <dd className="font-medium">
                                        {order.contact ?? '-'}
                                    </dd>
                                </div>
                                {order.user && (
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">
                                            Account
                                        </dt>
                                        <dd className="font-medium">
                                            {order.user.name}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                Order Details
                            </h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Job Type
                                    </dt>
                                    <dd className="font-medium">
                                        {order.job_type}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Quantity
                                    </dt>
                                    <dd className="font-medium">
                                        {order.quantity}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Specifications
                                    </dt>
                                    <dd className="font-medium">
                                        {order.specifications ?? '-'}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Status
                                    </dt>
                                    <dd>
                                        <Badge
                                            variant={
                                                statusVariant[order.status] ??
                                                'secondary'
                                            }
                                        >
                                            {order.status.replace(/_/g, ' ')}
                                        </Badge>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Quote Amount
                                    </dt>
                                    <dd className="font-medium">
                                        {order.quote_amount
                                            ? `$${order.quote_amount}`
                                            : 'Not quoted'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {(order.paper_stock || order.width || order.height || order.pages) && (
                        <Card>
                            <div className="p-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Job Specifications
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    {order.paper_stock && (
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">
                                                Paper Stock
                                            </dt>
                                            <dd className="font-medium">
                                                {order.paper_stock}
                                            </dd>
                                        </div>
                                    )}
                                    {(order.width || order.height) && (
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">
                                                Dimensions
                                            </dt>
                                            <dd className="font-medium">
                                                {order.width ?? '?'}mm × {order.height ?? '?'}mm
                                            </dd>
                                        </div>
                                    )}
                                    {order.pages && (
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">
                                                Pages / Sides
                                            </dt>
                                            <dd className="font-medium">
                                                {order.pages}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </Card>
                    )}

                    {order.requirements && (
                        <Card>
                            <div className="p-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Requirements
                                </h3>
                                <p className="text-sm whitespace-pre-wrap">
                                    {order.requirements}
                                </p>
                            </div>
                        </Card>
                    )}

                    {order.file_path && (
                        <Card>
                            <div className="p-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                    Uploaded File
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {order.original_filename}
                                </p>
                                {order.original_filename && isImageFile(order.original_filename) ? (
                                    <a
                                        href={`/storage/${order.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 block"
                                    >
                                        <img
                                            src={`/storage/${order.file_path}`}
                                            alt={order.original_filename}
                                            className="max-h-64 w-full rounded-lg border object-contain"
                                        />
                                    </a>
                                ) : (
                                    <div className="mt-3 flex items-center gap-3 rounded-lg border border-dashed p-4">
                                        <FileText className="size-8 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">
                                                {order.original_filename}
                                            </p>
                                            <a
                                                href={`/storage/${order.file_path}`}
                                                className="text-sm text-[#06b6d4] hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Download File
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    <Card>
                        <div className="p-6">
                            <CommentSection comments={comments} orderId={order.id} />
                        </div>
                    </Card>
                </div>
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
