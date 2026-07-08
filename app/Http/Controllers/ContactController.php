<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $jobTypes = [
            'Document Printing',
            'Sticker Paper Printing',
            'Photo Printing',
            'Document Delivery',
            'Typing Services',
            'Business Cards & Calling Cards',
        ];

        return Inertia::render('contact-us', ['jobTypes' => $jobTypes]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'contact' => ['nullable', 'string', 'max:50'],
            'job_type' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1'],
            'specifications' => ['nullable', 'string', 'max:1000'],
            'requirements' => ['nullable', 'string', 'max:5000'],
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,png,jpg,jpeg,ai,psd,eps', 'max:20480'],
        ]);

        if ($request->hasFile('file')) {
            $request->file('file')->store('uploads/contacts', 'public');
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Message sent. We will get back to you shortly.')]);

        return Redirect::back();
    }
}
