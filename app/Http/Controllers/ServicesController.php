<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ServicesController extends Controller
{
    public function index(): \Inertia\Response
    {
        $services = [
            [
                'title' => 'Document Printing',
                'description' => 'High-quality black & white and color printing on premium stocks. Perfect for business documents, reports, and forms.',
                'features' => ['Letter, Legal, Folio sizes', 'A4 & A3 formats', 'Premium bond paper & book paper', 'Fast turnaround'],
                'icon' => 'fileText',
            ],
            [
                'title' => 'Sticker Paper Printing',
                'description' => 'Custom sticker and label printing on durable adhesive stock. Ideal for product labels, branding, and promotions.',
                'features' => ['Glossy & matte finish', 'Water-resistant option', 'Custom shapes & sizes', 'Small to bulk runs'],
                'icon' => 'tag',
            ],
            [
                'title' => 'Photo Printing',
                'description' => 'Professional photo printing with accurate color reproduction for personal, passport, and presentation needs.',
                'features' => ['2x2 & 1x1 ID photos', 'A6 & A4 photo paper', 'Passport-size packages', 'Borderless printing'],
                'icon' => 'image',
            ],
            [
                'title' => 'Document Delivery',
                'description' => 'Reliable document delivery within the city. We ensure your printed materials reach their destination on time.',
                'features' => ['Same-day delivery', 'Secure handling', 'City-wide coverage', 'Real-time tracking'],
                'icon' => 'truck',
            ],
            [
                'title' => 'Typing Services',
                'description' => 'Accurate and efficient document encoding, transcription, and formatting for academic and business needs.',
                'features' => ['Document encoding', 'Transcription services', 'Formatting & layout', 'Proofreading included'],
                'icon' => 'type',
            ],
            [
                'title' => 'Business Cards & Calling Cards',
                'description' => 'Premium business cards on high-quality stock with various finishes. Perfect for professionals and businesses.',
                'features' => ['Glossy & matte finish', 'Textured premium stock', 'Standard & custom sizes', 'Express turnaround'],
                'icon' => 'creditCard',
            ],
        ];

        return Inertia::render('services', ['services' => $services]);
    }
}
