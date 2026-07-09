import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { dashboard, requestQuote } from '@/routes';

type Order = {
    id: number;
    job_type: string;
    quantity: number;
    status: string;
    quote_amount: string | null;
    payment_status?: string;
    created_at: string;
    name?: string;
};

type AdminProps = {
    role: 'admin';
    stats: {
        total_orders: number;
        pending_orders: number;
        quoted_orders: number;
        in_production: number;
        revenue: number;
    };
    recent_orders: (Order & { name: string })[];
    status_counts: Record<string, number>;
};

type CustomerProps = {
    role: 'customer';
    orders: Order[];
    active_requests: (Order & { progress: number })[];
};

type Props = AdminProps | CustomerProps;

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

function AdminDashboard({ stats, recent_orders, status_counts }: AdminProps) {
    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 sm:p-6 lg:p-8">
            <Heading
                title="Dashboard"
                description="Overview of your printing business"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                <Card className="flex flex-col gap-1 p-4">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                        Total Orders
                    </span>
                    <span className="text-xl font-bold md:text-2xl">
                        {stats.total_orders}
                    </span>
                </Card>
                <Card className="flex flex-col gap-1 border-amber-200 p-4">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                        Pending
                    </span>
                    <span className="text-xl font-bold text-amber-600 md:text-2xl">
                        {stats.pending_orders}
                    </span>
                </Card>
                <Card className="flex flex-col gap-1 border-sky-200 p-4">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                        Quoted
                    </span>
                    <span className="text-xl font-bold text-sky-600 md:text-2xl">
                        {stats.quoted_orders}
                    </span>
                </Card>
                <Card className="flex flex-col gap-1 border-violet-200 p-4">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                        In Production
                    </span>
                    <span className="text-xl font-bold text-violet-600 md:text-2xl">
                        {stats.in_production}
                    </span>
                </Card>
                <Card className="flex flex-col gap-1 border-emerald-200 p-4 sm:col-span-full md:col-span-1">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                        Revenue
                    </span>
                    <span className="text-xl font-bold text-emerald-600 md:text-2xl">
                        ${Number(stats.revenue).toLocaleString()}
                    </span>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-6 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Recent Orders
                        </h3>
                        <Link href="/admin/orders">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </div>
                    {recent_orders.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            No orders yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pr-4 pb-2 font-medium">
                                            ID
                                        </th>
                                        <th className="pr-4 pb-2 font-medium">
                                            Customer
                                        </th>
                                        <th className="pr-4 pb-2 font-medium">
                                            Job Type
                                        </th>
                                        <th className="pr-4 pb-2 font-medium">
                                            Status
                                        </th>
                                        <th className="pr-4 pb-2 font-medium">
                                            When
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="py-2 pr-4 font-medium">
                                                #{order.id}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {order.name}
                                            </td>
                                            <td className="py-2 pr-4 text-muted-foreground">
                                                {order.job_type}
                                            </td>
                                            <td className="py-2 pr-4">
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
                                            <td className="py-2 pr-4 text-muted-foreground">
                                                {order.created_at}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        Orders by Status
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(status_counts).map(
                            ([status, count]) => (
                                <div
                                    key={status}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <Badge
                                        variant={
                                            statusVariant[status] ?? 'secondary'
                                        }
                                    >
                                        {status.replace(/_/g, ' ')}
                                    </Badge>
                                    <span className="font-medium">{count}</span>
                                </div>
                            ),
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function CustomerDashboard({ orders, active_requests }: CustomerProps) {
    const statusStyles: Record<
        string,
        { label: string; color: string; bar: string }
    > = {
        pending: {
            label: 'Pending Review',
            color: 'text-yellow-600',
            bar: 'bg-yellow-500',
        },
        quoted: { label: 'Quoted', color: 'text-sky-600', bar: 'bg-sky-500' },
        approved: {
            label: 'Approved',
            color: 'text-blue-600',
            bar: 'bg-blue-500',
        },
        in_production: {
            label: 'In Production',
            color: 'text-cyan-600',
            bar: 'bg-cyan-500',
        },
        shipping: {
            label: 'Shipped',
            color: 'text-green-600',
            bar: 'bg-green-500',
        },
        delivered: {
            label: 'Delivered',
            color: 'text-green-600',
            bar: 'bg-green-500',
        },
        cancelled: {
            label: 'Cancelled',
            color: 'text-red-600',
            bar: 'bg-red-500',
        },
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto rounded-xl p-4 sm:p-6 lg:p-8">
            <section>
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        My Printing Requests
                    </h3>
                    <span className="text-xs text-muted-foreground">
                        {active_requests.length} Active Requests
                    </span>
                </div>
                {active_requests.length === 0 ? (
                    <Card className="p-12 text-center text-sm text-muted-foreground">
                        <p>No active requests.</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {active_requests.map((req) => {
                            const style =
                                statusStyles[req.status] ??
                                statusStyles.pending;

                            return (
                                <Card
                                    key={req.id}
                                    className="flex flex-col justify-between p-6 transition-all hover:shadow-md"
                                >
                                    <div>
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <span
                                                    className={`text-xs font-semibold uppercase ${style.color}`}
                                                >
                                                    {style.label}
                                                </span>
                                                <h4 className="mt-1 text-base font-semibold">
                                                    #{req.id}: {req.job_type}
                                                </h4>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {req.quantity} Units
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-6 h-2 w-full rounded-full bg-muted">
                                            <div
                                                className={`${style.bar} h-2 rounded-full transition-all`}
                                                style={{
                                                    width: `${req.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex items-center justify-between border-t pt-4 text-xs">
                                            <span className="text-muted-foreground">
                                                Submitted:{' '}
                                                <span className="font-medium text-foreground">
                                                    {req.created_at}
                                                </span>
                                            </span>
                                            <Link
                                                href={`/orders/${req.id}`}
                                                className="font-semibold text-[#06b6d4] hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </section>
            {/* Order History & Status Section */}
            <section className="overflow-hidden rounded-lg border">
                <div className="flex items-center justify-between border-b p-6">
                    <h3 className="text-base font-semibold">
                        Order History & Status
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-xs tracking-wider text-muted-foreground uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Order ID
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Date
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Total
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Payment
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-muted-foreground"
                                    >
                                        No orders yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="transition-colors hover:bg-muted/50"
                                    >
                                        <td className="px-6 py-4 font-semibold">
                                            #{order.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.created_at}
                                        </td>
                                        <td className="px-6 py-4">
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
                                        <td className="px-6 py-4">
                                            {order.quote_amount
                                                ? `$${Number(order.quote_amount).toLocaleString()}`
                                                : '—'}
                                        </td>
                                        <td className="px-6 py-4">
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
                                                ) ?? 'unpaid'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="text-xs font-semibold text-[#06b6d4] hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Support Shortcut */}
            <section className="mx-auto w-full max-w-2xl rounded-lg border-2 border-dashed border-muted-foreground/20 p-8 text-center">
                <h4 className="text-base font-semibold">
                    Need technical assistance?
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                    Our support engineers are available 24/7 to help with your
                    print specifications or order status.
                </p>
                <Link href={requestQuote().url}>
                    <Button className="mt-6 bg-[#06b6d4] text-white hover:bg-[#0e7490]">
                        Request Quote
                    </Button>
                </Link>
            </section>
        </div>
    );
}

export default function DashboardPage(props: Props) {
    return (
        <>
            <Head title={props.role === 'admin' ? 'Dashboard' : 'My Orders'} />
            {props.role === 'admin' ? (
                <AdminDashboard {...props} />
            ) : (
                <CustomerDashboard {...props} />
            )}
        </>
    );
}

DashboardPage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
