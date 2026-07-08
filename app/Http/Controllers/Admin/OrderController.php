<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::latest()->paginate(10);

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        return Inertia::render('admin/orders/show', [
            'order' => $order->load('user'),
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,quoted,approved,in_production,shipping,delivered,cancelled'],
            'admin_notes' => ['nullable', 'string', 'max:2000'],
            'quote_amount' => ['nullable', 'numeric', 'min:0'],
            'payment_status' => ['required', 'string', 'in:unpaid,partial,paid'],
        ]);

        $order->update($validated + ['quoted_at' => $validated['quote_amount'] ? now() : $order->quoted_at]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Order updated.')]);

        return to_route('admin.orders.show', $order);
    }
}
