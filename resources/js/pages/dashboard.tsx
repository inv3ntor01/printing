import { Head, Link, router } from '@inertiajs/react';
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

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
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
        <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
            <Heading title="Dashboard" description="Overview of your printing business" />

            <div className="grid gap-4 md:grid-cols-5">
                <Card className="p-4 flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Orders</span>
                    <span className="text-2xl font-bold">{stats.total_orders}</span>
                </Card>
                <Card className="p-4 flex flex-col gap-1 border-amber-200">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Pending</span>
                    <span className="text-2xl font-bold text-amber-600">{stats.pending_orders}</span>
                </Card>
                <Card className="p-4 flex flex-col gap-1 border-sky-200">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Quoted</span>
                    <span className="text-2xl font-bold text-sky-600">{stats.quoted_orders}</span>
                </Card>
                <Card className="p-4 flex flex-col gap-1 border-violet-200">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">In Production</span>
                    <span className="text-2xl font-bold text-violet-600">{stats.in_production}</span>
                </Card>
                <Card className="p-4 flex flex-col gap-1 border-emerald-200">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Revenue</span>
                    <span className="text-2xl font-bold text-emerald-600">${Number(stats.revenue).toLocaleString()}</span>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-6 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Recent Orders
                        </h3>
                        <Link href="/admin/orders">
                            <Button variant="outline" size="sm">View All</Button>
                        </Link>
                    </div>
                    {recent_orders.length === 0 ? (
                        <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-2 pr-4 font-medium">ID</th>
                                        <th className="pb-2 pr-4 font-medium">Customer</th>
                                        <th className="pb-2 pr-4 font-medium">Job Type</th>
                                        <th className="pb-2 pr-4 font-medium">Status</th>
                                        <th className="pb-2 pr-4 font-medium">When</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_orders.map((order) => (
                                        <tr key={order.id} className="border-b last:border-0">
                                            <td className="py-2 pr-4 font-medium">#{order.id}</td>
                                            <td className="py-2 pr-4">{order.name}</td>
                                            <td className="py-2 pr-4 text-muted-foreground">{order.job_type}</td>
                                            <td className="py-2 pr-4">
                                                <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                                                    {order.status.replace(/_/g, ' ')}
                                                </Badge>
                                            </td>
                                            <td className="py-2 pr-4 text-muted-foreground">{order.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

                <Card className="p-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Orders by Status
                    </h3>
                    <div className="space-y-3">
                        {Object.entries(status_counts).map(([status, count]) => (
                            <div key={status} className="flex items-center justify-between text-sm">
                                <Badge variant={statusVariant[status] ?? 'secondary'}>
                                    {status.replace(/_/g, ' ')}
                                </Badge>
                                <span className="font-medium">{count}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function CustomerDashboard({ orders, active_requests }: CustomerProps) {
    const statusStyles: Record<string, {label: string; color: string; bar: string }> = {
        pending: { label: 'Pending Review', color: 'text-yellow-600', bar: 'bg-yellow-500' },
        quoted: { label: 'Quoted', color: 'text-sky-600', bar: 'bg-sky-500' },
        approved: { label: 'Approved', color: 'text-blue-600', bar: 'bg-blue-500' },
        in_production: { label: 'In Production', color: 'text-cyan-600', bar: 'bg-cyan-500' },
        shipping: { label: 'Shipped', color: 'text-green-600', bar: 'bg-green-500' },
        delivered: { label: 'Delivered', color: 'text-green-600', bar: 'bg-green-500' },
        cancelled: { label: 'Cancelled', color: 'text-red-600', bar: 'bg-red-500' },
    };
    return (
        <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className='text-lg font-semibold'>My Printing Requests</h3>
                    <span className='text-xs text-muted-foreground'>
                        {active_requests.length} Active Requests
                    </span>
                </div>
                {active_requests.length === 0 ? (
                    <Card className="p-12 text-center text-sm text-muted-foreground">
                        <p>No active requests.</p>
                    </Card>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {active_requests.map((req) => {
                            const style = statusStyles[req.status] ?? statusStyles.pending;
                            return (
                                <Card key={req.id} className='p-6 flex flex-col justify-between hover:shadow-md transition-all'>
                                    <div>
                                        <div className='flex justify-between items-start mb-4'>
                                            <div>
                                                <span className={`text-xs font-semibold uppercase ${style.color}`}>{style.label}</span>
                                                <h4 className='text-base font-semibold mt-1'>#{req.id}: {req.job_type}</h4>
                                                <p className='text-xs text-muted-foreground mt-1'>{req.quantity} Units</p>
                                            </div>
                                        </div>
                                        <div className='w-full bg-muted rounded-full h-2 mb-6'>
                                            <div className={`${style.bar} h-2 rounded-full transition-all`} style={{ width: `${req.progress}%` }}></div>
                                        </div>
                                        <div className='flex justify-between items-center text-xs pt-4 border-t'>
                                            <span className='text-muted-foreground'>
                                                Submitted: <span className='font-medium text-foreground'>{req.created_at}</span>
                                            </span>
                                            <Link href={`/orders/${req.id}`}
                                                className='font-semibold text-[#06b6d4] hover:underline'>
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
            <section className='rounded-lg border overflow-hidden'>
                <div className='p-6 border-b flex justify-between items-center'>
                    <h3 className='text-base font-semibold'>Order  History & Status</h3>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-sm'>
                        <thead className='bg-muted text-muted-foreground text-xs uppercase tracking-wider'>
                            <tr>
                                <th className='px-6 py-4 font-semibold'>Order ID</th>
                                <th className='px-6 py-4 font-semibold'>Date</th>
                                <th className='px-6 py-4 font-semibold'>Status</th>
                                <th className='px-6 py-4 font-semibold'>Total</th>
                                <th className='px-6 py-4 font-semibold text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y'>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className='px-6 py-8 text-center text-muted-foreground'>
                                        No orders yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className='hover:bg-muted/50 transition-colors'>
                                        <td className='px-6 py-4 font-semibold'>#{order.id}</td>
                                        <td className='px-6 py-4'>{order.created_at}</td>
                                        <td className='px-6 py-4'>
                                            <Badge variant={statusVariant[order.status] ?? 'secondary'}>
                                                {order.status.replace(/_/g, ' ')}
                                            </Badge>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <Link href={`/orders/${order.id}`}
                                                className='text-[#06b6d4] hover:underline font-semibold text-xs'>
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
            <section className='border-2 border-dashed border-muted-foreground/20 p-8 rounded-lg text-center max-w-2xl mx-auto w-full'>
                <h4 className='text-base font-semibold'>Need technical assistance?</h4>
                <p className='text-sm text-muted-foreground mt-2'>
                    Our support engineers are available 24/7 to help with your print specifications or order status.
                </p>
                <Link href={requestQuote().url}>
                    <Button className='mt-6 bg-[#06b6d4] hover:bg-[#0e7490] text-white'>
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
