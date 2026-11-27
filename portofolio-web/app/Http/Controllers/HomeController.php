<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        $portfolioPath = public_path('portfolio/index.html');

        abort_unless(
            file_exists($portfolioPath),
            404,
            'Halaman portofolio belum tersedia.'
        );

        return response()->file($portfolioPath);
    }
}
