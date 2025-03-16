import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTag from "../ui/category-tag";

const TrendingSection = () => {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles/trending'],
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-6">Trending Now</h2>
        
        <div className="space-y-6">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-start space-x-4">
              <Skeleton className="h-6 w-16 flex-shrink-0" />
              <div>
                <Skeleton className="h-7 w-full mb-2" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!articles?.length) {
    return null;
  }

  // Map category IDs to names
  const categoryNames: { [key: number]: string } = {
    1: 'Politics',
    2: 'Business',
    3: 'Technology',
    4: 'Science',
    5: 'World',
    6: 'Sports'
  };

  return (
    <div>
      <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-6">Trending Now</h2>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="flex items-start space-x-4">
            <CategoryTag className="flex-shrink-0">
              {categoryNames[article.categoryId] || 'News'}
            </CategoryTag>
            <div>
              <h3 className="font-['Playfair_Display'] font-bold text-lg hover:text-red-600 transition-colors">
                <Link href={`/article/${article.slug}`}>
                  <a>{article.title}</a>
                </Link>
              </h3>
              <p className="text-sm text-gray-400 mt-1">{article.excerpt.substring(0, 60)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
