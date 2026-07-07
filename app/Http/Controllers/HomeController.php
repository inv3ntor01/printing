<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(): \Inertia\Response
    {
        $services = [
            [
                'title' => 'Document Printing',
                'description' => 'Letter, legal, folio, A4, and A3 printing on premium stocks for business documents and reports.',
                'tags' => ['Letter', 'Legal', 'A4', 'A3'],
                'icon' => 'fileText',
            ],
            [
                'title' => 'Sticker Paper Printing',
                'description' => 'Custom labels and stickers on durable adhesive stock for branding, products, and promotions.',
                'tags' => ['Glossy', 'Matte', 'Custom Shapes'],
                'icon' => 'tag',
            ],
            [
                'title' => 'Photo Printing',
                'description' => 'Professional photo prints with accurate color for ID photos, passports, and presentations.',
                'tags' => ['2x2', '1x1', 'A6', 'A4'],
                'icon' => 'image',
            ],
            [
                'title' => 'Document Delivery',
                'description' => 'Same-day secure delivery within the city. Your printed materials, delivered on time.',
                'tags' => ['Same-Day', 'Secure', 'City-Wide'],
                'icon' => 'truck',
            ],
            [
                'title' => 'Typing Services',
                'description' => 'Accurate encoding, transcription, and formatting for academic, legal, and business documents.',
                'tags' => ['Encoding', 'Transcription', 'Formatting'],
                'icon' => 'type',
            ],
            [
                'title' => 'Business Cards & Calling Cards',
                'description' => 'Premium business cards on high-quality stock. Glossy, matte, or textured finish with quick turnaround.',
                'tags' => ['Glossy', 'Matte', 'Textured', 'Express'],
                'icon' => 'creditCard',
            ],
        ];

        $stats = [
            ['label' => 'Production Uptime', 'value' => '24/7'],
            ['label' => 'Registration Accuracy', 'value' => '0.02mm'],
            ['label' => 'Enterprise Partners', 'value' => '500+'],
            ['label' => 'Color Consistency', 'value' => '99.9%'],
        ];

        $advantages = [
            [
                'title' => 'Uncompromising Quality',
                'description' => 'Multi-stage AI-assisted inspection ensures zero-defect output for critical enterprise documentation.',
                'icon' => 'shieldCheck',
            ],
            [
                'title' => 'Industrial Velocity',
                'description' => 'Strategic workflow automation and 24/7 operations allow for massive scale with tight deadlines.',
                'icon' => 'zap',
            ],
            [
                'title' => 'Smart Infrastructure',
                'description' => 'Integrated ERP systems for real-time tracking, inventory management, and seamless API connectivity.',
                'icon' => 'cpu',
            ],
        ];

        $cta = [
            'headline' => 'Ready to scale your production?',
            'subtext' => 'Get in touch with our engineering team for a custom quote or a tour of our high-volume facilities.',
            'primaryLabel' => 'Request a Consultation',
            'primaryHref' => '#',
            'secondaryLabel' => 'Download Capabilities PDF',
            'secondaryHref' => '#',
        ];

        return Inertia::render('home', [
            'services' => $services,
            'stats' => $stats,
            'advantages' => $advantages,
            'cta' => $cta,
        ]);
    }
}
