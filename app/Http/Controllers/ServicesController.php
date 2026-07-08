<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(): Response
    {
        $services = [
            [
                'title' => 'Document Printing',
                'description' => 'Letter, legal, folio, A4, and A3 printing on premium stocks for business documents and reports.',
                'features' => ['Letter', 'Legal', 'A4', 'A3'],
                'icon' => 'fileText',
            ],
            [
                'title' => 'Sticker Paper Printing',
                'description' => 'Custom labels and stickers on durable adhesive stock for branding, products, and promotions.',
                'features' => ['Glossy', 'Matte', 'Custom Shapes'],
                'icon' => 'tag',
            ],
            [
                'title' => 'Photo Printing',
                'description' => 'Professional photo prints with accurate color for ID photos, passports, and presentations.',
                'features' => ['2x2', '1x1', 'A6', 'A4'],
                'icon' => 'image',
            ],
            [
                'title' => 'Document Delivery',
                'description' => 'Same-day secure delivery within the city. Your printed materials, delivered on time.',
                'features' => ['Same-Day', 'Secure', 'City-Wide'],
                'icon' => 'truck',
            ],
            [
                'title' => 'Typing Services',
                'description' => 'Accurate encoding, transcription, and formatting for academic, legal, and business documents.',
                'features' => ['Encoding', 'Transcription', 'Formatting'],
                'icon' => 'type',
            ],
            [
                'title' => 'Business Cards & Calling Cards',
                'description' => 'Premium business cards on high-quality stock. Glossy, matte, or textured finish with quick turnaround.',
                'features' => ['Glossy', 'Matte', 'Textured', 'Express'],
                'icon' => 'creditCard',
            ],
        ];

        return Inertia::render('services', [
            'services' => $services,
        ]);
    }
}
