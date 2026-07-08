<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ResumeCustomizationController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('resume-customization');
    }
}
