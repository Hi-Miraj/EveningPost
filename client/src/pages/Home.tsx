import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import LatestNews from '@/components/home/LatestNews';
import TrendingSection from '@/components/home/TrendingSection';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>The Evening Post - Latest News and Updates</title>
        <meta name="description" content="Unfiltered. Unbiased. For Everyone." />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <HeroSection />
          <LatestNews />
          
          <section className="py-10 border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <TrendingSection />
                </div>
                <div className="lg:col-span-2">
                  <CategorySection />
                </div>
              </div>
            </div>
          </section>
          
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
