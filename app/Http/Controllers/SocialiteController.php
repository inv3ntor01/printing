<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

class SocialiteController extends Controller
{
    public function redirect(string $provider): RedirectResponse
    {
        return redirect()->route('login');
    }

    public function callback(string $provider): RedirectResponse
    {
        return redirect()->route('login');
    }
}
