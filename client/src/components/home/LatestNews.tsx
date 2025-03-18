import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTag from "../ui/category-tag";

const LatestNews = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/latest'],
  });

  if (isLoading) {
    return (
      <section className="py-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-8">Latest News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-8 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Skeleton className="h-12 w-40 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!articles?.length) {
    return null;
  }

  return (
    <section className="py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-8">Latest News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-gray-900 rounded-lg overflow-hidden">
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <CategoryTag className="mb-3 inline-block">
                  {article.categoryId === 1 ? 'Politics' : 
                   article.categoryId === 2 ? 'Business' : 
                   article.categoryId === 3 ? 'Technology' :
                   article.categoryId === 4 ? 'Science' :
                   article.categoryId === 5 ? 'World' :
                   article.categoryId === 6 ? 'Sports' :
                   article.categoryId === 7 ? 'Opinion' : 'News'} 
                </CategoryTag>
                <h3 className="text-xl font-['Playfair_Display'] font-bold mb-3">
                  <Link href={`/article/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <Link href={`/article/${article.slug}`} className="text-red-600 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-transparent border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200">
            View More News
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
