import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Article, Category } from "@shared/schema";
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import CategoryTag from "@/components/ui/category-tag";
import Newsletter from "@/components/home/Newsletter";

const CategoryPage = () => {
  const [match, params] = useRoute("/category/:slug");
  const { slug } = params || {};

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/by-category/${slug}`],
    enabled: !!slug,
  });

  const isLoading = categoryLoading || articlesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-10">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-48 mb-8 mx-auto" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-20 mb-3" />
                    <Skeleton className="h-8 w-full mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category || !articles) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-400">The category you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} | The Evening Post</title>
        <meta name="description" content={`Latest ${category.name} news and updates from The Evening Post.`} />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-4">{category.name}</h1>
              <p className="text-gray-400">Latest news and updates from the world of {category.name.toLowerCase()}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400">No articles found in this category.</p>
                </div>
              ) : (
                articles.map((article) => (
                  <div key={article.id} className="bg-gray-900 rounded-lg overflow-hidden">
                    {article.imageUrl && (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <CategoryTag className="mb-3 inline-block">{category.name}</CategoryTag>
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
                      <Link href={`/article/${article.slug}`}>
                        <a className="mt-4 inline-block text-red-600 hover:underline">Read More</a>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
        
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
