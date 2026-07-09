<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerOrderController extends Controller
{
    public function show(Request $request, Order $order): Response
    {
        $user = $request->user();

        if ($order->user_id !== $user->id && $order->email !== $user->email) {
            abort(403);
        }

        return Inertia::render('orders/show', [
            'order' => $order,
            'comments' => $order->comments()->with('user.roles')->latest()->get(),
        ]);
    }
}
