<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $databaseName = DB::connection()->getDatabaseName();

        return view('welcome', [
            'databaseName' => $databaseName,
        ]);
    }
}