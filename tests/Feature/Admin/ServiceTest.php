<?php

namespace Tests\Feature\Admin;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login()
    {
        $response = $this->get(route('admin.services.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_users_without_permission_cannot_view_services()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('admin.services.index'));
        $response->assertForbidden();
    }

    public function test_admin_can_view_services_index()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        Service::factory()->count(3)->create();

        $response = $this->actingAs($user)->get(route('admin.services.index'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/services/index')
            ->has('services.data', 3)
        );
    }

    public function test_admin_can_view_create_page()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $response = $this->actingAs($user)->get(route('admin.services.create'));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/services/create')
        );
    }

    public function test_admin_can_create_a_service()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $response = $this->actingAs($user)->post(route('admin.services.store'), [
            'name' => 'Premium Business Cards',
            'description' => 'High quality business cards',
            'price' => 29.99,
            'delivery_time' => '3-5 business days',
            'category' => 'business-cards',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('admin.services.index'));

        $this->assertDatabaseHas('services', ['name' => 'Premium Business Cards']);
    }

    public function test_admin_can_view_edit_page()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $service = Service::factory()->create();

        $response = $this->actingAs($user)->get(route('admin.services.edit', $service));

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('admin/services/edit')
            ->where('service.id', $service->id)
        );
    }

    public function test_admin_can_update_a_service()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $service = Service::factory()->create();

        $response = $this->actingAs($user)->patch(route('admin.services.update', $service), [
            'name' => 'Updated Service Name',
            'price' => 49.99,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('admin.services.index'));

        $this->assertDatabaseHas('services', [
            'id' => $service->id,
            'name' => 'Updated Service Name',
            'price' => 49.99,
        ]);
    }

    public function test_admin_can_delete_a_service()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $service = Service::factory()->create();

        $response = $this->actingAs($user)->delete(route('admin.services.destroy', $service));

        $response->assertSessionHasNoErrors();
        $response->assertRedirect(route('admin.services.index'));

        $this->assertDatabaseMissing('services', ['id' => $service->id]);
    }

    public function test_validation_requires_name_and_price()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');

        $response = $this->actingAs($user)->post(route('admin.services.store'), [
            'name' => '',
            'price' => '',
        ]);

        $response->assertSessionHasErrors(['name', 'price']);
    }
}
