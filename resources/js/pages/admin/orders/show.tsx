import { Head, Link, useForm } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import CommentSection from '@/components/comment-section';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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
    admin_notes: string | null;
    quote_amount: string | null;
    payment_status: string;
    quoted_at: string | null;
    created_at: string;
    updated_at: string;
    user: { id: number; name: string; email: string } | null;
};

const isImageFile = (filename: string) =>
    /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i.test(filename);

const statusOptions = [
    'pending',
    'quoted',
    'approved',
    'in_production',
    'shipping',
    'delivered',
    'cancelled',
];

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

interface Comment {
    id: number;
    user: { id: number; name: string };
    body: string;
    created_at: string;
}

export default function Show({ order, comments }: { order: Order; comments: Comment[] }) {
    const { data, setData, put, processing, errors } = useForm({
        status: order.status,
        admin_notes: order.admin_notes ?? '',
        quote_amount: order.quote_amount ?? '',
        payment_status: order.payment_status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/orders/${order.id}`);
    };

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
                    <Link href="/admin/orders" className="shrink-0">
                        <Button variant="outline" className="w-full sm:w-auto">Back to Orders</Button>
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
                                        {order.contact ?? '—'}
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
                                        {order.specifications ?? '—'}
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
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">
                                        Payment Status
                                    </dt>
                                    <dd className="font-medium">
                                        <Badge
                                            variant={
                                                order.payment_status === 'paid'
                                                    ? 'default'
                                                    : order.payment_status ===
                                                        'partial'
                                                      ? 'secondary'
                                                      : 'destructive'
                                            }
                                        >
                                            {(
                                                order.payment_status ?? 'unpaid'
                                            ).replace(/_/g, ' ')}
                                        </Badge>
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
                                {order.original_filename && isImageFile(order.original_filename) ? (
                                    <a
                                        href={`/storage/${order.file_path}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={`/storage/${order.file_path}`}
                                            alt={order.original_filename ?? 'Uploaded file'}
                                            className="max-h-64 w-full rounded-lg border object-contain"
                                        />
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 rounded-lg border border-dashed p-4">
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

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4 p-6">
                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Update Order
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s.replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Quote Amount ($)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.quote_amount}
                                    onChange={(e) =>
                                        setData('quote_amount', e.target.value)
                                    }
                                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                                />
                                <div>
                                    <Label className="mb-1 block text-sm font-medium">
                                        Payment Status
                                    </Label>
                                    <select
                                        value={data.payment_status}
                                        onChange={(e) =>
                                            setData(
                                                'payment_status',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="unpaid">Unpaid</option>
                                        <option value="partial">Partial</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                    {errors.payment_status && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.payment_status}
                                        </p>
                                    )}
                                </div>
                                {errors.quote_amount && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.quote_amount}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Admin Notes
                            </label>
                            <textarea
                                rows={3}
                                value={data.admin_notes}
                                onChange={(e) =>
                                    setData('admin_notes', e.target.value)
                                }
                                className="w-full rounded border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Internal notes about this order..."
                            />
                        </div>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update Order'}
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: '/admin/orders',
        },
        {
            title: 'Order Detail',
            href: '#',
        },
    ],
};
