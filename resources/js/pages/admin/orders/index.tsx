import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Order = {
    id: number;
    name: string;
    email: string;
    job_type: string;
    quantity: number;
    status: string;
    quote_amount: string | null;
    payment_status?: string;
    created_at: string;
};

type PaginatedData = {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

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

export default function Index({
    orders: { data, current_page, last_page },
}: {
    orders: PaginatedData;
}) {
    return (
        <>
            <Head title="Orders" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="Orders"
                        description="Manage customer quote requests and orders"
                    />
                </div>

                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Customer
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Job Type
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Qty
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Amount
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Payment
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            #{order.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium">
                                                {order.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {order.email}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {order.job_type}
                                        </td>
                                        <td className="px-4 py-3">
                                            {order.quantity}
                                        </td>
                                        <td className="px-4 py-3">
                                            {order.quote_amount
                                                ? `$${order.quote_amount}`
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={
                                                    order.payment_status ===
                                                    'paid'
                                                        ? 'default'
                                                        : order.payment_status ===
                                                            'partial'
                                                          ? 'secondary'
                                                          : 'destructive'
                                                }
                                            >
                                                {order.payment_status?.replace(
                                                    /_/g,
                                                    ' ',
                                                )}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={
                                                    statusVariant[
                                                        order.status
                                                    ] ?? 'secondary'
                                                }
                                            >
                                                {order.status.replace(
                                                    /_/g,
                                                    ' ',
                                                )}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {current_page > 1 && (
                            <Link
                                href={`/admin/orders?page=${current_page - 1}`}
                            >
                                <Button variant="outline" size="sm">
                                    Previous
                                </Button>
                            </Link>
                        )}
                        <span className="text-sm text-muted-foreground">
                            Page {current_page} of {last_page}
                        </span>
                        {current_page < last_page && (
                            <Link
                                href={`/admin/orders?page=${current_page + 1}`}
                            >
                                <Button variant="outline" size="sm">
                                    Next
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Orders',
            href: '/admin/orders',
        },
    ],
};
