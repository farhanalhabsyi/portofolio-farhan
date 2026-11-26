<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('skills')
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data proyek berhasil diambil.',
            'data' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:projects,slug'],
            'summary' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'thumbnail_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'is_featured' => ['sometimes', 'boolean'],
            'skill_ids' => ['sometimes', 'array'],
            'skill_ids.*' => ['integer', 'exists:skills,id'],
        ]);

        $skillIds = $validated['skill_ids'] ?? [];
        unset($validated['skill_ids']);

        $project = Project::create($validated);

        if (array_key_exists('skill_ids', $request->all())) {
            $project->skills()->sync($skillIds);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil ditambahkan.',
            'data' => $project->load('skills'),
        ], 201);
    }

    public function show(Project $project)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Detail proyek berhasil diambil.',
            'data' => $project->load('skills'),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')->ignore($project->id),
            ],
            'summary' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'thumbnail_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'is_featured' => ['sometimes', 'boolean'],
            'skill_ids' => ['sometimes', 'array'],
            'skill_ids.*' => ['integer', 'exists:skills,id'],
        ]);

        $hasSkillIds = array_key_exists('skill_ids', $validated);
        $skillIds = $validated['skill_ids'] ?? [];

        unset($validated['skill_ids']);

        $project->update($validated);

        if ($hasSkillIds) {
            $project->skills()->sync($skillIds);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil diperbarui.',
            'data' => $project->load('skills'),
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Proyek berhasil dihapus.',
            'data' => null,
        ]);
    }
}