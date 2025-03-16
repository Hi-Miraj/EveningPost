import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/home/Newsletter';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | The Evening Post</title>
        <meta name="description" content="Learn about The Evening Post, our mission, values, and the team behind our news coverage." />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-6">About Us</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  The Evening Post is a leading source of news and information, dedicated to delivering reliable, timely, and insightful coverage from around the globe.
                </p>
                
                <h2>Our Mission</h2>
                <p>
                  Our mission is to provide accurate, balanced, and comprehensive reporting that helps our readers understand the complex world around them. We believe in the power of journalism to inform, educate, and inspire.
                </p>
                
                <h2>Our Values</h2>
                <ul>
                  <li><strong>Accuracy:</strong> We verify facts and correct errors promptly.</li>
                  <li><strong>Independence:</strong> We maintain editorial independence and avoid conflicts of interest.</li>
                  <li><strong>Fairness:</strong> We seek diverse perspectives and treat all subjects with respect.</li>
                  <li><strong>Transparency:</strong> We are clear about our sources and methods.</li>
                  <li><strong>Accountability:</strong> We accept responsibility for our work and welcome feedback.</li>
                </ul>
                
                <h2>Our History</h2>
                <p>
                  Founded in 2010, The Evening Post began as a digital-first publication committed to reimagining journalism for the modern era. Over the years, we have grown our audience while maintaining our commitment to quality reporting and storytelling.
                </p>
                
                <h2>Our Team</h2>
                <p>
                  Our global network of journalists, editors, and contributors brings diverse expertise and perspectives to our coverage. From breaking news to in-depth analysis, our team works tirelessly to bring you the stories that matter.
                </p>
                
                <h2>Contact Us</h2>
                <p>
                  We value your feedback and questions. You can reach our editorial team at <a href="mailto:editor@eveningpost.com" className="text-red-600 hover:underline">editor@eveningpost.com</a> or visit our <a href="/contact" className="text-red-600 hover:underline">Contact page</a> for more information.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
