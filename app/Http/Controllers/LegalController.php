<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacy(): Response
    {
        return Inertia::render('legal/privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('legal/terms');
    }

    public function compliance(): Response
    {
        return Inertia::render('legal/compliance');
    }

    public function ip(): Response
    {
        return Inertia::render('legal/ip');
    }
}
