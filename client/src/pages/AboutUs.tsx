import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/home/Newsletter';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us | The Evening Post</title>
        <meta name="description" content="Learn about The Evening Post, our open-source news platform dedicated to unrestricted access to information." />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-6">About Us</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  The Evening Post is an open-source news sharing platform that aims to provide unrestricted access to global news. With a focus on freedom of expression and transparency, the platform allows users to share, access, and discuss news from all corners of the world without any restrictions or limitations.
                </p>
                
                <h2>Our Vision</h2>
                <p>
                  We dream of a world where neutral, authentic news sharing is completely free from restrictions. Founded on March 17, 2025, our platform stands as a testament to the power of collective journalism—where facts matter, diverse perspectives are celebrated, and no single entity controls the narrative.
                </p>
                
                <h2>Key Principles</h2>
                <ul>
                  <li><strong>Truly Open-Source:</strong> Every aspect of The Evening Post is open-source—from our codebase to our editorial process. Anyone can contribute, modify, and improve the platform.</li>
                  <li><strong>Unrestricted Expression:</strong> We believe in the free exchange of information. Users can share and access news from any source, ensuring a genuine diversity of perspectives.</li>
                  <li><strong>Global Community:</strong> Our platform transcends borders, welcoming news from every corner of the world to create an interconnected network of information sharing.</li>
                  <li><strong>Community Governance:</strong> There is no hierarchy here—every contributor is an equal stakeholder in our mission. We make decisions collectively and transparently.</li>
                  <li><strong>Censorship Resistance:</strong> We stand firmly against information control. The Evening Post provides a space where users can express themselves freely and access news without artificial constraints.</li>
                  <li><strong>Rigorous Fact-Checking:</strong> Freedom doesn't mean chaos. Our community upholds standards of accuracy through collaborative verification and transparent correction processes.</li>
                </ul>
                
                <h2>Why The Evening Post Exists</h2>
                <p>
                  In an era where information is increasingly filtered through corporate and algorithmic gatekeepers, The Evening Post breaks down these barriers. We've created a space where everyone—regardless of background or resources—has equal opportunity to share news, express opinions, and participate in global conversation.
                </p>
                
                <h2>Our Structure</h2>
                <p>
                  The Evening Post has no employees—only participants. We are contributors who share news, developers who maintain the platform, fact-checkers who ensure accuracy, moderators who preserve freedom of expression, and readers who drive meaningful discussion. As a non-profit organization, we are committed to remaining free from commercial pressures and conflicts of interest.
                </p>
                
                <h2>Join The Movement</h2>
                <p>
                  Experience truly open news, contact us at <a href="mailto:mirajshafek04@gmail.com" className="text-red-600 hover:underline">contribute@eveningpost.org</a> or visit our <a href="/contact" className="text-red-600 hover:underline">Contact page</a> for more information and to get involved. Together, we're redefining what news can be—authentic, neutral, and truly free.
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
