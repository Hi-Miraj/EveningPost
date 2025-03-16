import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { Link } from "wouter";
import CategoryTag from "../ui/category-tag";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/featured'],
  });

  // Find featured article and secondary articles
  const featuredArticle = articles?.find(article => article.isFeatured === 1);
  const secondaryArticles = articles?.filter(article => article.isFeatured === 0).slice(0, 2);

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Article Skeleton */}
            <div className="lg:col-span-2 bg-gray-900 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-64" />
              <div className="p-6">
                <Skeleton className="h-8 w-20 mb-3" />
                <Skeleton className="h-10 w-full mb-3" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>

            {/* Secondary Articles Skeleton */}
            <div className="space-y-8">
              {[0, 1].map((index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden p-6">
                  <Skeleton className="h-6 w-20 mb-3" />
                  <Skeleton className="h-8 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-5 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!articles?.length) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story */}
          {featuredArticle && (
            <div className="lg:col-span-2 bg-gray-900 rounded-lg overflow-hidden">
              {featuredArticle.imageUrl && (
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <CategoryTag className="mb-3 inline-block">World</CategoryTag>
                <h2 className="text-2xl md:text-4xl font-['Playfair_Display'] font-bold mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-400 mb-4">{featuredArticle.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>By {featuredArticle.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <Link href={`/article/${featuredArticle.slug}`}>
                  <a className="mt-4 inline-block text-red-600 hover:underline">
                    Continue Reading →
                  </a>
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Featured Stories */}
          <div className="space-y-8">
            {secondaryArticles?.map((article) => (
              <div key={article.id} className="bg-gray-900 rounded-lg overflow-hidden p-6">
                <CategoryTag className="mb-3 inline-block">
                  {article.categoryId === 1 ? 'Politics' : 
                   article.categoryId === 2 ? 'Business' : 
                   article.categoryId === 3 ? 'Technology' : 'Science'}
                </CategoryTag>
                <h3 className="text-xl font-['Playfair_Display'] font-bold mb-3">
                  <Link href={`/article/${article.slug}`}>
                    <a className="hover:text-red-600 transition-colors">{article.title}</a>
                  </Link>
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
