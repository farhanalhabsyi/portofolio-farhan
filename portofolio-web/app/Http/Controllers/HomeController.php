<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $laravelVersion = app()->version();

        try {
            $connection = DB::connection();
            $connection->getPdo();

            $databaseName = $connection->getDatabaseName();
            $databaseStatus = 'Terhubung';
        } catch (\Throwable $e) {
            $databaseName = config('database.connections.mysql.database');
            $databaseStatus = 'Tidak terhubung';
        }

        return view('welcome', [
            'databaseName' => $databaseName,
            'databaseStatus' => $databaseStatus,
            'laravelVersion' => $laravelVersion,
        ]);
    }
}