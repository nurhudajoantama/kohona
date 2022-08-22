<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Status;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Status::insert(Status::statusAll());
        User::insert([
            'name' => 'Admin',
            'email' => 'mail@admin.com',
            'password' => bcrypt('admin'),
            'is_admin' => true,
        ]);
    }
}
