import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, getCategory, getProductsByCategory, type Product } from "@/data/products";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, products: getProductsByCategory(params.category) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Tatvan` },
          { name: "description", content: `${loaderData.category.name}: ${loaderData.category.tagline}. Shop pure, organic ${loaderData.category.name.toLowerCase()} from Tatvan.` },
          { property: "og:title", content: `${loaderData.category.name} — Tatvan` },
          { property: "og:description", content: loaderData.category.tagline },
        ]
      : [{ title: "Category — Tatvan" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>
          <h1 className="font-display text-5xl text-primary">{category.name}</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{category.tagline}</p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/shop" className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className={
                c.slug === category.slug
                  ? "rounded-full border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                  : "rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
              }
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function CategoryNotFound() {
  return (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Category not found</h1>
        <p className="mt-3 text-muted-foreground">The category you're looking for doesn't exist.</p>
        <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  );
}
