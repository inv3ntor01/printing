<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        $jobTypes = [
            'Document Printing',
            'Sticker Paper Printing',
            'Photo Printing',
            'Typing Services',
            'Business Cards & Calling Cards',
            'Document Delivery',
        ];

        return Inertia::render('request-quote', [
            'jobTypes' => $jobTypes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        if (! $request->user()) {
            return Redirect::back()->with('error', 'You must be logged in to submit a quote request.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact' => 'required|string|regex:/^(09|\+639|639)\d{9}$/|max:13',
            'job_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'specifications' => 'nullable|string|max:255',
            'paper_stock' => 'nullable|string|max:255',
            'width' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'pages' => 'nullable|integer|min:1',
            'requirements' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg,ai,psd,eps|max:51200',
        ]);

        $filePath = null;
        $originalFilename = null;

        if ($request->hasFile('file')) {
            $originalFilename = $request->file('file')->getClientOriginalName();
            $filePath = $request->file('file')->store('uploads/quotes', 'public');
        }

        Order::create([
            'user_id' => $request->user()?->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'contact' => $validated['contact'],
            'job_type' => $validated['job_type'],
            'quantity' => $validated['quantity'],
            'specifications' => $validated['specifications'] ?? null,
            'paper_stock' => $validated['paper_stock'],
            'width' => $validated['width'],
            'height' => $validated['height'],
            'pages' => $validated['pages'],
            'requirements' => $validated['requirements'],
            'file_path' => $filePath,
            'original_filename' => $originalFilename,
            'status' => 'pending',
        ]);

        return Redirect::route('request-quote')->with('success', 'Your quote request has been submitted! We\'ll get back to you within 24 hours.');
    }
}
