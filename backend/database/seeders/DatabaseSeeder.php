<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Admin',
            'middle_name' => null,
            'last_name' => 'Admin',
            'suffix' => null,
            'email' => 'yato.rend18@gmail.com',
            'is_admin' => true,
            'password' => Hash::make('P@ssword123!'),
        ]);

        User::factory(500)->create();
    }
}
