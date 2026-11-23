<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'M Farhan Alhabsyi',
                'headline' => 'Mahasiswa Informatika',
                'bio' => 'Mahasiswa Informatika yang tertarik pada pengembangan web, UI/UX, dan teknologi digital. Data profil ini dapat disesuaikan dengan informasi portfolio yang sebenarnya.',
                'photo_url' => null,
                'cv_url' => 'https://example.com/cv-farhan.pdf',
                'email' => 'farhan@example.com',
                'phone' => null,
                'location' => 'Bandar Lampung',
                'github_url' => 'https://github.com/farhanalhabsyi',
                'linkedin_url' => null,
                'instagram_url' => null,
            ]
        );

        $skillsData = [
            [
                'name' => 'HTML',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'icon' => 'html',
            ],
            [
                'name' => 'CSS',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'icon' => 'css',
            ],
            [
                'name' => 'JavaScript',
                'category' => 'Frontend',
                'level' => 'Intermediate',
                'icon' => 'javascript',
            ],
            [
                'name' => 'PHP',
                'category' => 'Backend',
                'level' => 'Beginner',
                'icon' => 'php',
            ],
            [
                'name' => 'MySQL',
                'category' => 'Database',
                'level' => 'Intermediate',
                'icon' => 'mysql',
            ],
            [
                'name' => 'Git',
                'category' => 'Tools',
                'level' => 'Intermediate',
                'icon' => 'git',
            ],
        ];

        $skills = [];

        foreach ($skillsData as $data) {
            $skills[$data['name']] = Skill::updateOrCreate(
                ['name' => $data['name']],
                $data
            );
        }

        $projectsData = [
            [
                'title' => 'EduBridge',
                'slug' => 'edubridge',
                'summary' => 'Konsep platform pembelajaran bahasa Inggris.',
                'description' => 'Proyek UI/UX untuk platform pembelajaran bahasa Inggris.',
                'thumbnail_url' => null,
                'demo_url' => null,
                'github_url' => null,
                'is_featured' => true,
                'skill_names' => ['HTML', 'CSS'],
            ],
            [
                'title' => 'SmartStock',
                'slug' => 'smartstock',
                'summary' => 'Aplikasi pengelolaan stok barang UMKM.',
                'description' => 'Aplikasi inventory untuk membantu pencatatan produk, stok masuk, stok keluar, dan pengelolaan barang.',
                'thumbnail_url' => null,
                'demo_url' => null,
                'github_url' => 'https://github.com/farhanalhabsyi/umkm-smartstock',
                'is_featured' => true,
                'skill_names' => ['JavaScript', 'PHP'],
            ],
            [
                'title' => 'CollabSkill',
                'slug' => 'collabskill',
                'summary' => 'Platform kolaborasi mahasiswa dan UMKM.',
                'description' => 'Proyek aplikasi kolaborasi mahasiswa dengan UMKM untuk mendukung kerja sama dan pengembangan proyek.',
                'thumbnail_url' => null,
                'demo_url' => null,
                'github_url' => 'https://github.com/farhanalh1/Collabskill',
                'is_featured' => false,
                'skill_names' => ['MySQL', 'Git'],
            ],
        ];

        foreach ($projectsData as $data) {
            $skillNames = $data['skill_names'];
            unset($data['skill_names']);

            $project = Project::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );

            $project->skills()->sync(
                collect($skillNames)
                    ->map(fn ($name) => $skills[$name]->id)
                    ->all()
            );
        }

        Experience::updateOrCreate(
            [
                'title' => 'Mahasiswa Informatika',
                'organization' => 'Universitas Teknokrat Indonesia',
            ],
            [
                'type' => 'Pendidikan',
                'start_date' => '2023-09-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Data contoh untuk pengujian tabel pengalaman. Sesuaikan tanggal dan deskripsi dengan riwayat pendidikan sebenarnya.',
            ]
        );

        Experience::updateOrCreate(
            [
                'title' => 'Pengembangan Proyek Web',
                'organization' => 'Praktikum Pemrograman Web 2',
            ],
            [
                'type' => 'Organisasi',
                'start_date' => '2026-09-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Data contoh untuk pengujian tabel pengalaman proyek. Sesuaikan dengan pengalaman yang benar-benar pernah dilakukan.',
            ]
        );

        Certificate::updateOrCreate(
            [
                'title' => 'Sertifikat Contoh Praktikum',
                'issuer' => 'Data Dummy Praktikum',
            ],
            [
                'issued_date' => '2026-01-01',
                'credential_url' => null,
                'description' => 'Record contoh untuk memenuhi pengujian tabel certificates. Bukan sertifikat asli.',
            ]
        );
    }
}