import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | The Evening Post</title>
        <meta name="description" content="Get in touch with The Evening Post. Send us your feedback, questions, or news tips." />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <Header />
        
        <main className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-['Playfair_Display'] font-bold mb-6">Contact Us</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-4">Get in Touch</h2>
                  <p className="text-gray-400 mb-6">
                    We value your feedback and are here to answer any questions you may have about our reporting or services.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Editorial Inquiries</h3>
                      <p className="text-gray-400">editor@eveningpost.com</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Advertising</h3>
                      <p className="text-gray-400">ads@eveningpost.com</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Subscription Support</h3>
                      <p className="text-gray-400">support@eveningpost.com</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Office Location</h3>
                      <p className="text-gray-400">
                        123 News Avenue<br />
                        Metropolis, MP 10001
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-4">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="bg-gray-900 border-gray-700 focus:border-red-600"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email address" 
                                className="bg-gray-900 border-gray-700 focus:border-red-600"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Subject of your message" 
                                className="bg-gray-900 border-gray-700 focus:border-red-600"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message" 
                                className="bg-gray-900 border-gray-700 focus:border-red-600 min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-4">News Tips</h2>
                <p className="text-gray-400 mb-4">
                  Have a story idea or news tip? We're always looking for important and interesting stories to share with our readers.
                </p>
                <p className="text-gray-400">
                  For confidential tips, please email <a href="mailto:tips@eveningpost.com" className="text-red-600 hover:underline">tips@eveningpost.com</a> or use our secure contact form.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;
