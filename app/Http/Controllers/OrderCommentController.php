<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderCommentController extends Controller
{
    public function store(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        $order->comments()->create([
            'user_id' => $request->user()->id,
            'body' => $validated['body'],
        ]);

        return redirect()->back();
    }
}
