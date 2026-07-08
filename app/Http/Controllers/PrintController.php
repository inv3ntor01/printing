<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PrintController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('print/index');
    }
}
