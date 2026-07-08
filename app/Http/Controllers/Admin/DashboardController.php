<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->hasRole('admin')) {
            return $this->adminDashboard();
        }

        return $this->customerDashboard($user);
    }

    private function adminDashboard(): Response
    {
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $quotedOrders = Order::where('status', 'quoted')->count();
        $inProductionOrders = Order::whereIn('status', ['approved', 'in_production'])->count();
        $revenue = Order::whereIn('status', ['delivered', 'shipping'])->sum('quote_amount');

        $recentOrders = Order::latest()->take(5)->get()->map(fn ($o) => [
            'id' => $o->id,
            'name' => $o->name,
            'job_type' => $o->job_type,
            'status' => $o->status,
            'quote_amount' => $o->quote_amount,
            'payment_status' => $o->payment_status,
            'created_at' => $o->created_at->diffForHumans(),
        ]);

        $statusCounts = collect(['pending', 'quoted', 'approved', 'in_production', 'shipping', 'delivered', 'cancelled'])
            ->mapWithKeys(fn ($s) => [$s => Order::where('status', $s)->count()]);

        return Inertia::render('dashboard', [
            'role' => 'admin',
            'stats' => [
                'total_orders' => $totalOrders,
                'pending_orders' => $pendingOrders,
                'quoted_orders' => $quotedOrders,
                'in_production' => $inProductionOrders,
                'revenue' => $revenue,
            ],
            'recent_orders' => $recentOrders,
            'status_counts' => $statusCounts,
        ]);
    }

    private function customerDashboard($user): Response
    {
        $progressMap = [
            'pending' => 10,
            'quoted' => 25,
            'approved' => 45,
            'in_production' => 65,
            'shipping' => 85,
            'delivered' => 100,
            'cancelled' => 0,
        ];

        $orders = Order::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->latest()
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'job_type' => $o->job_type,
                'quantity' => $o->quantity,
                'status' => $o->status,
                'quote_amount' => $o->quote_amount,
                'payment_status' => $o->payment_status,
                'created_at' => $o->created_at->format('M d, Y'),
            ]);

        $activeRequests = $orders
            ->whereIn('status', ['pending', 'quoted', 'approved', 'in_production', 'shipping'])
            ->values()
            ->map(fn ($o) => array_merge($o, [
                'progress' => $progressMap[$o['status']] ?? 0,
            ]));

        return Inertia::render('dashboard', [
            'role' => 'customer',
            'orders' => $orders,
            'active_requests' => $activeRequests,
        ]);
    }
}
