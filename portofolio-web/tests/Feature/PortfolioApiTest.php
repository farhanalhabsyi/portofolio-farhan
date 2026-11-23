<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_endpoint_returns_profile_data(): void
    {
        Profile::create([
            'full_name' => 'Test Mahasiswa',
            'headline' => 'Mahasiswa Informatika',
            'bio' => 'Profil untuk pengujian API.',
            'cv_url' => 'https://example.com/cv.pdf',
            'email' => 'test@example.com',
            'location' => 'Bandar Lampung',
        ]);

        $response = $this->getJson('/api/portfolio/profile');

        $response
            ->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('data.full_name', 'Test Mahasiswa')
            ->assertJsonPath('data.headline', 'Mahasiswa Informatika');
    }

    public function test_skills_endpoint_returns_skill_list(): void
    {
        Skill::create([
            'name' => 'HTML',
            'category' => 'Frontend',
            'level' => 'Intermediate',
            'icon' => 'html',
        ]);

        $response = $this->getJson('/api/portfolio/skills');

        $response
            ->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.name', 'HTML')
            ->assertJsonPath('data.0.icon_class', 'html');
    }

    public function test_projects_endpoint_includes_related_skills(): void
    {
        $skill = Skill::create([
            'name' => 'PHP',
            'category' => 'Backend',
            'level' => 'Intermediate',
        ]);

        $project = Project::create([
            'title' => 'Test Project',
            'slug' => 'test-project',
            'summary' => 'Proyek untuk pengujian.',
            'description' => 'Deskripsi proyek pengujian API.',
            'github_url' => 'https://github.com/example/test-project',
            'is_featured' => true,
        ]);

        $project->skills()->attach($skill->id);

        $response = $this->getJson('/api/portfolio/projects');

        $response
            ->assertOk()
            ->assertJsonPath('status', 'success')
            ->assertJsonPath('total', 1)
            ->assertJsonPath('data.0.slug', 'test-project')
            ->assertJsonPath('data.0.repo_url', 'https://github.com/example/test-project')
            ->assertJsonPath('data.0.skills.0.name', 'PHP');
    }

    public function test_project_detail_returns_404_for_unknown_slug(): void
    {
        $response = $this->getJson(
            '/api/portfolio/projects/slug-tidak-ada'
        );

        $response
            ->assertNotFound()
            ->assertJsonPath('status', 'error')
            ->assertJsonPath('message', 'Proyek tidak ditemukan.')
            ->assertJsonPath('data', null);
    }
}