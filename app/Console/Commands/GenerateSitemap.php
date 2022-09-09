<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\Merchant;
use App\Models\Status;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Console\Command;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sitemap = Sitemap::create()
            ->add(Url::create('/'))
            ->add(Url::create('/products'));

        Product::all()->each(function (Product $product) use ($sitemap) {
            $sitemap->add(Url::create("/products/{$product->slug}"));
        });

        Merchant::where('status_id', '=', Status::acceptedId)->each(function (Merchant $mrchant) use ($sitemap) {
            $sitemap->add(Url::create("/merchants/{$mrchant->slug}"));
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
