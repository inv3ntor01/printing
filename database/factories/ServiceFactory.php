<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $categories = ['business-cards', 'flyers', 'banners', 'brochures', 'posters', 'stickers', 'booklets', 'envelopes'];

        return [
            'name' => fake()->randomElement([
                'Premium Business Cards',
                'A5 Flyers',
                'Roll-up Banners',
                'A4 Brochures',
                'A3 Posters',
                'Vinyl Stickers',
                'Saddle-stitch Booklets',
                'Window Envelopes',
            ]),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 5, 200),
            'delivery_time' => fake()->randomElement(['1-2 business days', '3-5 business days', '5-7 business days']),
            'category' => fake()->randomElement($categories),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(0, 100),
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
