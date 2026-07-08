import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import services from '@/routes/admin/services';

type Service = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    delivery_time: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
};

type PaginatedData = {
    data: Service[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export default function Index({ services: { data, current_page, last_page } }: { services: PaginatedData }) {
    return (
        <>
            <Head title="Services" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="Services"
                        description="Manage your printing service catalog"
                    />
                    <Link href={services.create()}>
                        <Button>Add Service</Button>
                    </Link>
                </div>

                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Price</th>
                                    <th className="px-4 py-3 font-medium">Delivery</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((service) => (
                                    <tr key={service.id} className="border-b last:border-0">
                                        <td className="px-4 py-3 font-medium">{service.name}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.category ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">${service.price}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.delivery_time ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={service.is_active ? 'default' : 'secondary'}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link href={services.edit(service.id)}>
                                                    <Button variant="outline" size="sm">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                                            No services found.
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
                            <Link href={services.index({ query: { page: current_page - 1 } })}>
                                <Button variant="outline" size="sm">Previous</Button>
                            </Link>
                        )}
                        <span className="text-sm text-muted-foreground">
                            Page {current_page} of {last_page}
                        </span>
                        {current_page < last_page && (
                            <Link href={services.index({ query: { page: current_page + 1 } })}>
                                <Button variant="outline" size="sm">Next</Button>
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
            title: 'Services',
            href: services.index(),
        },
    ],
};
