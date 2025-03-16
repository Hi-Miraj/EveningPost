import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CategoryTag from "../ui/category-tag";

const CategorySection = () => {
  const [position, setPosition] = useState(0);
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Simulated category images
  const categoryImages = {
    politics: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
    business: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
    technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
    science: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
    world: "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
    sports: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
  };

  const handlePrev = () => {
    setPosition(Math.max(position - 1, 0));
  };

  const handleNext = () => {
    if (categories) {
      setPosition(Math.min(position + 1, categories.length - 1));
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold">Browse by Category</h2>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!categories?.length) {
    return null;
  }

  // Transform position into a translateX value
  const translateValue = `translateX(-${position * 33.33}%)`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold">Browse by Category</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev}
            disabled={position === 0}
            className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNext}
            disabled={!categories || position >= categories.length - 1}
            className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="category-slider overflow-hidden">
        <div 
          className="category-track flex space-x-4 transition-transform duration-300"
          style={{ transform: translateValue }}
        >
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <a className="category-item flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <div className="bg-gray-900 rounded-lg overflow-hidden h-40 relative">
                  {categoryImages[category.slug as keyof typeof categoryImages] && (
                    <img 
                      src={categoryImages[category.slug as keyof typeof categoryImages]} 
                      alt={`${category.name} category`} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <CategoryTag className="mb-2">{category.name}</CategoryTag>
                    <h3 className="text-white font-['Playfair_Display'] font-bold text-xl">
                      Latest {category.name} News
                    </h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
