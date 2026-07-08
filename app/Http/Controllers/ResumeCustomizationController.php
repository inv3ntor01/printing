<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ResumeCustomizationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('resume-customization');
    }
}
