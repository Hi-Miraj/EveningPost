import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const jobListings = [
  {
    id: 1,
    title: "Senior Political Reporter",
    department: "Editorial",
    location: "Washington, D.C.",
    type: "Full-time",
    description: "We're seeking an experienced political reporter to cover national politics, elections, and policy developments."
  },
  {
    id: 2,
    title: "Technology Editor",
    department: "Editorial",
    location: "San Francisco",
    type: "Full-time",
    description: "Lead our technology coverage, managing a team of reporters and shaping our approach to covering the tech industry."
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "New York",
    type: "Full-time",
    description: "Develop and implement digital marketing strategies to grow our audience and subscription base."
  },
  {
    id: 4,
    title: "Data Visualization Developer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create compelling interactive graphics and data visualizations to enhance our storytelling."
  },
  {
    id: 5,
    title: "Investigative Reporter",
    department: "Editorial",
    location: "New York",
    type: "Full-time",
    description: "Pursue in-depth investigations on topics of public interest, with a focus on accountability journalism."
  }
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | The Evening Post</title>
        <meta name="description" content="Join our team at The Evening Post. Explore current job openings and career opportunities in journalism and media." />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-6">Careers</h1>
              
              <div className="prose prose-lg prose-invert max-w-none mb-10">
                <p>
                  Join our team of talented journalists, technologists, and media professionals dedicated to delivering high-quality news and information to our readers.
                </p>
                
                <h2>Why Work With Us</h2>
                <p>
                  The Evening Post offers a dynamic work environment where creativity, initiative, and excellence are valued. We are committed to building a diverse and inclusive workplace that reflects the communities we serve.
                </p>
                
                <p>Our benefits include:</p>
                <ul>
                  <li>Competitive salary and comprehensive health benefits</li>
                  <li>Flexible work arrangements</li>
                  <li>Professional development opportunities</li>
                  <li>Collaborative and innovative culture</li>
                  <li>Commitment to work-life balance</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-6">Current Openings</h2>
              
              <div className="space-y-6 mb-10">
                {jobListings.map((job) => (
                  <Card key={job.id} className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-xs">
                          {job.department}
                        </span>
                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-xs">
                          {job.location}
                        </span>
                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-md text-xs">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4">{job.description}</p>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-4">Don't See the Right Fit?</h2>
                <p className="text-gray-400 mb-6">
                  We're always looking for talented individuals to join our team. Send your resume and tell us how you can contribute.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  Submit General Application
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Careers;
