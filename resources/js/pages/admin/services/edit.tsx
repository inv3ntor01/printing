import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ServiceController from '@/actions/App/Http/Controllers/Admin/ServiceController';
import services from '@/routes/admin/services';

const categories = [
    { value: 'business-cards', label: 'Business Cards' },
    { value: 'flyers', label: 'Flyers' },
    { value: 'banners', label: 'Banners' },
    { value: 'brochures', label: 'Brochures' },
    { value: 'posters', label: 'Posters' },
    { value: 'stickers', label: 'Stickers' },
    { value: 'booklets', label: 'Booklets' },
    { value: 'envelopes', label: 'Envelopes' },
];

type Service = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    delivery_time: string | null;
    category: string | null;
    is_active: boolean;
    sort_order: number;
};

export default function Edit({ service }: { service: Service }) {
    return (
        <>
            <Head title="Edit Service" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Edit Service"
                    description={`Update "${service.name}"`}
                />

                <Form
                    {...ServiceController.update.form(service.id)}
                    className="space-y-6 max-w-2xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required defaultValue={service.name} />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    defaultValue={service.description ?? ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={service.price} />
                                    <InputError message={errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        defaultValue={service.category ?? ''}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.category} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="delivery_time">Delivery Time</Label>
                                    <Input id="delivery_time" name="delivery_time" defaultValue={service.delivery_time ?? ''} />
                                    <InputError message={errors.delivery_time} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="sort_order">Sort Order</Label>
                                    <Input id="sort_order" name="sort_order" type="number" min="0" defaultValue={service.sort_order} />
                                    <InputError message={errors.sort_order} />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="is_active"
                                    name="is_active"
                                    type="checkbox"
                                    value="1"
                                    defaultChecked={service.is_active}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="is_active">Active</Label>
                                <InputError message={errors.is_active} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Service</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Services',
            href: services.index(),
        },
        {
            title: 'Edit',
            href: services.index(),
        },
    ],
};
