import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Article } from "@shared/schema";
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Skeleton } from "@/components/ui/skeleton";
import CategoryTag from "@/components/ui/category-tag";
import Newsletter from "@/components/home/Newsletter";

const ArticlePage = () => {
  const [match, params] = useRoute("/article/:slug");
  const { slug } = params || {};

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-72 mb-4" />
              <Skeleton className="h-6 w-full mb-6" />
              
              <Skeleton className="h-5 w-48 mb-8" />
              
              <Skeleton className="h-64 w-full mb-8" />
              
              <div className="space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-400">The article you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Map category IDs to names
  const categoryNames: { [key: number]: string } = {
    1: 'Politics',
    2: 'Business', 
    3: 'Technology',
    4: 'Science',
    5: 'World',
    6: 'Sports',
    7: 'Opinion'
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | The Evening Post</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto">
              <CategoryTag className="mb-4">
                {categoryNames[article.categoryId] || 'News'}
              </CategoryTag>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">{article.excerpt}</p>
              
              <div className="flex items-center text-gray-500 mb-8">
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
              
              {article.imageUrl && (
                <div className="mb-8">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              
              <div className="prose prose-lg prose-invert max-w-none">
                {/* Render content with proper paragraphs */}
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </main>
        
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default ArticlePage;
