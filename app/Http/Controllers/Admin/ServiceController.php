<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::ordered()->paginate(10);

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        Service::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service created.')]);

        return to_route('admin.services.index');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service updated.')]);

        return to_route('admin.services.index');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Service deleted.')]);

        return to_route('admin.services.index');
    }
}
