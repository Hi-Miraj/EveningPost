import { categories, articles, users, type User, type InsertUser, type Category, type InsertCategory, type Article, type InsertArticle } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getAllArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  getLatestArticles(): Promise<Article[]>;
  getTrendingArticles(): Promise<Article[]>;
  getArticlesByCategoryId(categoryId: number): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articleStore: Map<number, Article>;
  private categoryStore: Map<number, Category>;
  private userCurrentId: number;
  private articleCurrentId: number;
  private categoryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.articleStore = new Map();
    this.categoryStore = new Map();
    this.userCurrentId = 1;
    this.articleCurrentId = 1;
    this.categoryCurrentId = 1;
    
    // Add sample categories
    this.initializeCategories();
    
    // Add sample articles
    this.initializeArticles();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articleStore.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articleStore.get(id);
  }
  
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articleStore.values()).find(
      (article) => article.slug === slug
    );
  }
  
  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articleStore.values())
      .filter(article => article.isFeatured === 1 || article.isFeatured === 0)
      .sort((a, b) => b.isFeatured - a.isFeatured)
      .slice(0, 3);
  }
  
  async getLatestArticles(): Promise<Article[]> {
    return Array.from(this.articleStore.values())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
  }
  
  async getTrendingArticles(): Promise<Article[]> {
    return Array.from(this.articleStore.values())
      .sort(() => 0.5 - Math.random()) // Randomize for demo purposes
      .slice(0, 5);
  }
  
  async getArticlesByCategoryId(categoryId: number): Promise<Article[]> {
    return Array.from(this.articleStore.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleCurrentId++;
    const article: Article = { ...insertArticle, id };
    this.articleStore.set(id, article);
    return article;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoryStore.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categoryStore.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categoryStore.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categoryStore.set(id, category);
    return category;
  }
  
  // Initialize sample data
  private initializeCategories() {
    const sampleCategories: InsertCategory[] = [
      { name: 'Politics', slug: 'politics' },
      { name: 'Business', slug: 'business' },
      { name: 'Technology', slug: 'technology' },
      { name: 'Science', slug: 'science' },
      { name: 'World', slug: 'world' },
      { name: 'Sports', slug: 'sports' },
      { name: 'Opinion', slug: 'opinion' }
    ];
    
    sampleCategories.forEach(category => {
      this.createCategory(category);
    });
  }
  
  private initializeArticles() {
    const sampleArticles: InsertArticle[] = [
      {
        title: 'Global Climate Summit Concludes with Historic Agreement',
        slug: 'global-climate-summit-concludes-with-historic-agreement',
        excerpt: 'World leaders reach consensus on ambitious carbon reduction targets, marking a significant step forward in the fight against climate change.',
        content: `World leaders from over 190 countries have reached a historic agreement at the Global Climate Summit, setting ambitious targets to reduce carbon emissions by 2030.

The landmark deal, which came after two weeks of intense negotiations, commits nations to cutting emissions by at least 45% compared to 2010 levels within the next decade. Developed countries have also pledged $100 billion annually to help developing nations transition to clean energy.

"This is a pivotal moment in our collective fight against climate change," said UN Secretary-General in a statement. "For the first time, we have a truly global commitment that meets the scale of the challenge we face."

The agreement includes mechanisms for transparency and accountability, with countries required to report their progress every two years. It also emphasizes the importance of protecting vulnerable ecosystems and supporting communities most affected by climate impacts.

Climate activists have cautiously welcomed the deal, though many argue that even stronger actions are needed. "This agreement is a step in the right direction, but the climate crisis demands more ambitious timelines," said prominent environmental campaigner Julia Reynolds.

Implementation will begin immediately, with the first review of progress scheduled for 2023. Experts say that the success of the agreement will ultimately depend on how quickly countries translate their commitments into concrete policies and actions.`,
        imageUrl: 'https://images.unsplash.com/photo-1518107616985-bd48230d3b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80',
        categoryId: 5, // World
        author: 'Sarah Johnson',
        publishedAt: new Date('2023-11-15T09:30:00Z').toISOString(),
        isFeatured: 1
      },
      {
        title: 'Senate Passes Key Infrastructure Bill',
        slug: 'senate-passes-key-infrastructure-bill',
        excerpt: 'Bipartisan effort secures funding for nationwide infrastructure improvements over the next decade.',
        content: `The Senate has passed a landmark $1.2 trillion infrastructure bill in a rare show of bipartisan cooperation, paving the way for the largest investment in the nation's infrastructure in decades.

The bill, which passed with a 69-30 vote, allocates funds for roads, bridges, public transit, broadband internet, and upgrading the power grid. It represents a significant victory for the administration, which had made infrastructure a key priority.

"This is what can happen when Republicans and Democrats say they're going to work together to get something done," said the Senate Majority Leader during a press conference following the vote.

The bill now moves to the House of Representatives, where it faces a more complicated path forward. Progressive members have indicated they want to see it linked to a larger spending package focused on climate change, healthcare, and education.

Business leaders have widely praised the bill, with the Chamber of Commerce calling it "a victory for America's economic competitiveness." Construction and manufacturing sectors are expected to see significant job growth as projects begin.

State and local officials are already preparing for the influx of federal funds, with many prioritizing long-delayed projects that have been on hold due to budget constraints.`,
        imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 1, // Politics
        author: 'Robert Chen',
        publishedAt: new Date('2023-11-14T14:15:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'Central Bank Announces Interest Rate Decision',
        slug: 'central-bank-announces-interest-rate-decision',
        excerpt: 'Markets react as central bank maintains current rates amid economic recovery signs.',
        content: `The Central Bank announced today that it will maintain current interest rates, keeping the benchmark rate at 0.25% amid signs of economic recovery following the pandemic downturn.

In a statement, the bank's monetary policy committee cited improving employment figures and controlled inflation as key factors in the decision. However, they noted that they remain "vigilant" about potential risks to the recovery.

"The current path of monetary policy remains appropriate to support economic growth while keeping inflation in check," said the Central Bank Chair during a press conference. "We are seeing positive indicators, but the recovery is not yet complete."

Financial markets responded positively to the announcement, with the main stock index rising 1.2% following the news. Analysts had widely expected rates to remain unchanged, though there had been speculation about signals for future increases.

The committee's statement indicated that rate increases could begin in early 2024 if economic conditions continue to improve. This timeline is slightly later than many economists had predicted earlier this year.

The bank also announced it would continue its asset purchase program at the current pace, providing continued liquidity to financial markets.`,
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 2, // Business
        author: 'Maria Gonzalez',
        publishedAt: new Date('2023-11-14T11:45:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'New AI Breakthrough Could Transform Healthcare',
        slug: 'new-ai-breakthrough-could-transform-healthcare',
        excerpt: 'Researchers announce revolutionary AI system capable of predicting patient outcomes with unprecedented accuracy.',
        content: `A team of researchers from a leading medical institute has developed a groundbreaking artificial intelligence system that can predict patient outcomes with unprecedented accuracy, potentially transforming how healthcare is delivered.

The AI model, trained on anonymized data from over three million patient records, can identify subtle patterns that human doctors might miss. In clinical trials, it correctly predicted patient deterioration 48 hours before conventional monitoring systems in 85% of cases.

"This represents a quantum leap in predictive healthcare," said Dr. Eleanor Chen, lead researcher on the project. "Early intervention is critical in many conditions, and this system gives medical teams a crucial time advantage."

The system is designed to integrate with existing electronic health record systems and can provide real-time alerts to healthcare providers. It analyzes hundreds of data points, from vital signs to lab results and even notes from medical staff.

Privacy advocates have raised concerns about patient data protection, though the research team emphasizes that all development was done using properly anonymized data and with strict ethical oversight.

The technology has already been licensed to several major hospital systems for pilot implementation, with wider rollout expected next year pending regulatory approval.`,
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 3, // Technology
        author: 'Michael Zhang',
        publishedAt: new Date('2023-11-13T08:30:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'Major Tech Company Announces Expansion Plans',
        slug: 'major-tech-company-announces-expansion-plans',
        excerpt: 'Silicon Valley giant reveals plans for new headquarters and thousands of new jobs.',
        content: `A leading technology company has announced plans for a major expansion, including a new headquarters campus and the creation of 10,000 new jobs over the next five years.

The $2 billion investment will include a state-of-the-art campus designed with sustainability in mind, featuring solar power, rainwater harvesting, and natural ventilation systems. Construction is expected to begin in early 2024.

"This expansion represents our commitment to innovation and our confidence in future growth," said the company's CEO during the announcement event. "We're excited to create thousands of new roles across engineering, AI research, and product development."

The new headquarters will be located in the eastern part of the city, an area that has been targeted for economic revitalization. Local officials estimate the project will generate an additional 15,000 indirect jobs in construction, services, and related industries.

The announcement comes as many tech companies are rethinking their real estate strategies following the shift to remote work during the pandemic. Unlike some competitors who have reduced office space, this company is doubling down on in-person collaboration.

"While we embrace flexible work arrangements, we believe that bringing talented people together in thoughtfully designed spaces drives innovation," explained the company's Chief People Officer.

The company also announced plans to expand its presence in Europe and Asia, with new engineering centers planned for Berlin and Singapore.`,
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 2, // Business
        author: 'Jennifer Wang',
        publishedAt: new Date('2023-11-13T10:15:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'New Exoplanet Discovery Shows Potential for Life',
        slug: 'new-exoplanet-discovery-shows-potential-for-life',
        excerpt: 'Astronomers identify Earth-like planet in the habitable zone of a nearby star system.',
        content: `Astronomers have discovered a potentially habitable exoplanet orbiting a star just 40 light-years from Earth, making it one of the closest Earth-like worlds ever found.

The planet, designated Kepler-296f, is 1.2 times the size of Earth and orbits within the habitable zone of its star, the region where temperatures could allow liquid water to exist on the surface.

"This is among the most exciting exoplanet discoveries to date," said Dr. Marcus Patel, lead astronomer on the discovery team. "Initial spectroscopic analysis indicates the presence of an atmosphere, which is a critical component for life as we know it."

The discovery was made using a combination of data from space telescopes and ground-based observatories. Scientists were able to confirm the planet's size, orbit, and some preliminary atmospheric composition.

While researchers caution that habitability cannot be confirmed without more data, the planet is now at the top of the list for follow-up observations with next-generation telescopes scheduled to come online in the next few years.

"We'll be pointing everything we've got at this system," said Dr. Patel. "The proximity means we have an unprecedented opportunity to study a potentially habitable world in detail."

The star itself is a K-type orange dwarf, smaller and cooler than our sun but known for stellar stability, which further increases the chances that life could develop on an orbiting planet.`,
        imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 4, // Science
        author: 'Samantha Rogers',
        publishedAt: new Date('2023-11-12T16:45:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'Peace Talks Resume in Conflict Zone',
        slug: 'peace-talks-resume-in-conflict-zone',
        excerpt: 'Regional powers broker new diplomatic initiative to end long-standing hostilities.',
        content: `Peace negotiations have resumed in the long-running conflict between two neighboring states, with international mediators expressing cautious optimism about a potential breakthrough.

The talks, hosted in a neutral capital city, bring together high-level delegations from both sides for the first direct discussions in over eighteen months. Regional powers have played a key role in bringing the parties back to the table.

"This represents a critical opportunity to move beyond the cycle of violence that has affected millions of civilians," said the head of the international mediation team. "All parties have expressed a commitment to finding a sustainable solution."

The agenda includes discussions on border security, resource sharing, and humanitarian access to affected areas. Previous attempts at peace have faltered over implementation details and mutual distrust.

Humanitarian organizations have welcomed the talks, emphasizing the urgent need for a resolution. An estimated 2.3 million people have been displaced by the conflict, with critical infrastructure severely damaged in border regions.

"While we've seen promising starts before, there are several factors that make this round different," explained a senior diplomat involved in the process. "External pressures and economic realities are pushing both sides toward compromise."

Security remains tight around the venue, with the talks expected to continue for at least two weeks.`,
        imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 5, // World
        author: 'Ahmed Hassan',
        publishedAt: new Date('2023-11-11T13:20:00Z').toISOString(),
        isFeatured: 0
      },
      {
        title: 'Underdog Team Makes Historic Championship Win',
        slug: 'underdog-team-makes-historic-championship-win',
        excerpt: 'Against all odds, team secures their first title in dramatic final match.',
        content: `In what many are calling one of the greatest underdog stories in sports history, FC United has won their first championship title after a dramatic comeback victory in the final match of the season.

The team, which was playing in the second division just three years ago, overcame a two-goal deficit in the second half to defeat the defending champions 3-2. The winning goal came in the final minute of stoppage time from captain Jamie Rodriguez.

"I still can't believe it," said Rodriguez in a post-match interview, fighting back tears. "This team has faced so many challenges, so many people said we didn't belong at this level. Today we proved that heart and determination can overcome anything."

The victory is especially meaningful for the city's passionate fan base, who have supported the club through decades of disappointment. Thousands of supporters filled the streets after the match in spontaneous celebration.

The team's success has been attributed to their innovative playing style and the leadership of head coach Martina Diaz, who became the first woman to manage a team to a championship in the league's history.

"This isn't just about winning a trophy," said Diaz. "It's about showing that when people come together with a common goal and support each other, incredible things can happen."

Sports analysts are already calling the season "miraculous," noting that FC United had the lowest wage bill in the league and was widely predicted to be relegated at the start of the season.`,
        imageUrl: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
        categoryId: 6, // Sports
        author: 'Carlos Menendez',
        publishedAt: new Date('2023-11-10T21:15:00Z').toISOString(),
        isFeatured: 0
      },
{
  title: 'MedVisual: A New Chapter in Bangladesh\'s Healthcare Innovation',
  slug: 'medvisual-new-chapter-bangladesh-healthcare-innovation',
  excerpt: 'AI-powered startup MedVisual launches in Bangladesh, promising to revolutionize healthcare with innovative digital solutions.',
  content: `In a groundbreaking move for Bangladesh's healthcare sector, MedVisual officially marked its foundation on February 14, 2025. This AI-powered startup aims to bridge the critical gaps in medical management and patient care, introducing a revolutionary approach to digitized healthcare that promises to transform the way healthcare services are delivered in the country.

Born from an ambitious idea at HackCSB 2024, MedVisual is led by a visionary team of innovators—Md Raiyan Rahman (CEO), Md Shahidullah (CTO), and Miraj Shafek (CFO). United by their shared passion for improving healthcare accessibility, they envisioned a solution that integrates cutting-edge technology with the real-world challenges facing Bangladesh's healthcare system. Their collective vision is clear: to create a seamless, AI-driven healthcare ecosystem that empowers patients, doctors, and hospitals alike, ensuring that high-quality medical services are available to everyone, no matter their location or background.

The MedVisual platform offers a wide range of pioneering features that are set to revolutionize the healthcare landscape. This includes AI-powered medical report digitization, which allows patients to easily access and track their health data. Additionally, telemedicine consultations enable patients to consult with doctors remotely, ensuring timely healthcare even in the most remote areas. The integrated e-pharmacy allows for the easy ordering of medicines, while partnerships with hospitals ensure that patients receive the best possible care. The platform also offers predictive health analytics, helping patients stay ahead of potential health issues before they become serious.

The startup's holistic approach focuses on making healthcare more accessible, efficient, and data-driven, offering personalized experiences for patients and actionable insights for healthcare providers. MedVisual's comprehensive solutions not only streamline patient experiences but also improve healthcare outcomes by harnessing the power of AI and advanced analytics to make smarter, more informed decisions.

"Our mission is to redefine the way healthcare operates in Bangladesh," said CEO Md Raiyan Rahman. "We're not just another health-tech startup—we're building an ecosystem that will shape the future of healthcare accessibility and management. By combining AI and real-world applications, we aim to create a truly transformative impact on the healthcare sector."

As part of its milestone celebration, MedVisual also launched its official website (<a href="https://medvisual.netlify.app/">MedVisual</a>), providing a comprehensive glimpse into its vision, progress, and upcoming innovations. The site highlights the startup's achievements so far, showcasing its team, products, and the long-term impact it hopes to achieve. With a dedicated team of experts and a forward-thinking approach, MedVisual is poised to leave a lasting and positive impact on Bangladesh's healthcare landscape, paving the way for similar transformations in other emerging markets. The team's innovative efforts and commitment to progress reflect their ambition to revolutionize the future of healthcare, not only in Bangladesh but across the globe.`,
  imageUrl: 'https://images.unsplash.com/photo-1742229062571-2006d23b9371?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  categoryId: 3, // Technology
  author: 'Editorial Team',
  publishedAt: new Date('2025-02-14T10:00:00Z').toISOString(),
  isFeatured: 0
},

{
  "title": "NASA Astronauts Butch Wilmore and Suni Williams Finally Begin Their Return Journey After Nine Months in Space",
  "slug": "nasa-astronauts-butch-wilmore-suni-williams-return-journey-after-nine-months-in-space",
  "excerpt": "After an unexpected nine-month stay aboard the International Space Station, NASA astronauts Butch Wilmore and Suni Williams have finally begun their journey back to Earth in a SpaceX Dragon capsule.",
  "content": "After an unexpected nine-month stay aboard the International Space Station (ISS), NASA astronauts Butch Wilmore and Suni Williams have finally begun their long-awaited journey back to Earth. Initially scheduled for just an eight-day mission, their return was delayed due to technical issues with the Boeing Starliner spacecraft that brought them to the ISS in June 2024.\n\nWilmore and Williams are making their way back in a SpaceX Dragon capsule, accompanied by fellow NASA astronaut Nick Hague and Russian cosmonaut Aleksandr Gorbunov. The capsule undocked from the ISS at 05:05 GMT (01:05 EDT) on Tuesday, with a planned splashdown off the coast of Florida at 21:57 GMT (17:57 EDT). However, the exact landing time could shift depending on weather conditions.\n\nThe return trip is far from easy. As the SpaceX Dragon re-enters Earth's atmosphere, it will experience intense heat—reaching temperatures of up to 1,600°C—and astronauts will endure significant G-forces, nearly four times Earth's gravity. Once the capsule slows down, four parachutes will deploy to ensure a smooth splashdown in the ocean.\n\nThough their mission was extended far beyond its original timeline, the astronauts made the most of their time aboard the ISS. They participated in various scientific experiments and conducted spacewalks, with Suni Williams setting a new record for the most hours spent outside the station by a female astronaut.\n\nTheir extended stay was necessitated by problems with Boeing's Starliner spacecraft. Initially, NASA had planned for Starliner to return them to Earth, but after experiencing multiple technical malfunctions on its journey to the ISS, the spacecraft was deemed unsafe for the trip back. Starliner eventually returned to Earth uncrewed in September, leaving Wilmore and Williams to wait for a new ride home.\n\nNASA opted to bring them back on the next scheduled SpaceX mission, which launched in September carrying only two astronauts instead of four—leaving two seats open for Wilmore and Williams. This decision meant their return was postponed until now.\n\nWith a replacement crew arriving at the ISS on Sunday, the final preparations for their return were set in motion. Wilmore and Williams expressed mixed emotions about leaving. Speaking ahead of their departure, Wilmore said they were well-prepared for the extended stay:\n\n\"We train for this. In human spaceflight, you always prepare for both short and long missions. That's part of the job.\"\n\nWilliams, on the other hand, reflected on the experience and the challenges of returning to Earth:\n\n\"I know this is likely my last mission, and I'll miss this unique perspective of living in space. I just want to hold onto this inspiration when I get back.\"\n\nTheir prolonged mission gained even more attention when SpaceX CEO Elon Musk suggested that politics played a role in the delay, claiming his company could have brought the astronauts home sooner. However, NASA officials refuted this, explaining that the decision was based on flight schedules and the needs of the ISS crew rotation.\n\nGarrett Reisman, a former NASA astronaut and former director of space operations at SpaceX, supported NASA's approach, noting:\n\n\"Launching a special rescue mission wouldn't have significantly shortened their stay. Maybe by a couple of months at most. The costs of such a mission, running into hundreds of millions of dollars, just weren't justified.\"\n\nOnce back on Earth, Wilmore and Williams will head to NASA's Johnson Space Center in Houston, Texas, where medical teams will assess their health. Extended time in space takes a toll on the body, leading to muscle loss, bone density reduction, and circulation changes. To help them readjust to gravity, they will undergo extensive physical therapy and rehabilitation.\n\nDespite these challenges, their immediate priority is reconnecting with loved ones. Wilmore and Williams have spoken about missing the simple joys of Earth—fresh air, sunlight, and even sitting on a porch with their pets.\n\n\"Suni emailed me recently about how much she misses just sitting outside, feeling the sun, and being with her dogs,\" Reisman shared with the BBC. \"It's the little things about Earth that astronauts long for the most.\"\n\nAs they prepare for re-entry and splashdown, the world watches, eager to welcome back two astronauts who have demonstrated resilience, adaptability, and an unwavering commitment to space exploration.",
  "imageUrl": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/52c7/live/83854b00-0316-11f0-81d9-675e79ab7115.jpg.webp",
  "categoryId": 4,
  "author": "Science Correspondent",
  "publishedAt": "2025-03-17T01:41:00Z",
  "isFeatured": 0
},
            {
  title: 'Lamine Yamal Shines with a Stunning Stoppage-Time Strike as Barcelona Stages Dramatic 4-2 Comeback Against Atletico Madrid',
  slug: 'lamine-yamal-stoppage-time-strike-barcelona-comeback-atletico-madrid',
  excerpt: 'Barcelona produces unforgettable comeback as 17-year-old sensation Lamine Yamal seals thrilling 4-2 victory with spectacular long-range goal.',
  content: `Barcelona produced yet another unforgettable comeback as they overturned a two-goal deficit to secure a thrilling 4-2 victory over Atletico Madrid at the Metropolitano Stadium. The night belonged to 17-year-old sensation Lamine Yamal, who sealed the win with a spectacular long-range goal in stoppage time.

Atletico Madrid looked in complete control after Alexander Sorloth doubled their lead in the 70th minute. However, Barcelona responded in emphatic fashion, beginning with Robert Lewandowski finding the net in the 72nd minute to spark hopes of a comeback.

The turning point came deep into stoppage time when Yamal unleashed a breathtaking strike from outside the box, sending the ball past the Atletico goalkeeper to put Barcelona ahead for the first time in the match at 3-2.

Hansi Flick's substitutions proved decisive, with Ferran Torres making an instant impact off the bench by scoring a well-placed header in the 78th minute to bring Barcelona level at 2-2.

As Atletico struggled to recover from the late setback, Torres struck again in the dying moments of the match to secure his brace and seal a 4-2 victory for the Catalan side.

Speaking after the game, Yamal expressed his delight at the result and his crucial goal:

"It was vital to get the three points today. We kept fighting until the very end, and I was confident that if I got an opportunity, I would make it count. When the ball came to me, I took my chance, and thankfully, it went in."

Barcelona's win not only extended their unbeaten run but also propelled them to the top of the league table. With 60 points, they are now level with Real Madrid but hold a crucial game in hand in the title race.

Barcelona's head coach, Hansi Flick, was full of praise for his players after another resilient performance:

"I am proud of the team. They never stopped believing, and that mentality made the difference tonight. It's a massive victory, and being at the top of the table is a great reward for our efforts."

As the title race heats up, Barcelona's ability to stage dramatic comebacks could prove decisive in their pursuit of domestic glory. With performances like this, the Catalan giants continue to showcase their fighting spirit and attacking prowess on the biggest stages.`,
  imageUrl: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2025-03/GettyImages-2204952196.jpg?h=a3d47caa&itok=C7YVgUwC',
  categoryId: 6, // Sports
  author: 'Sports Correspondent',
  publishedAt: new Date('2025-03-17T01:41:00Z').toISOString(),
  isFeatured: 1
},
{
  "title": "Rebuilding Trust in Journalism in the Age of Misinformation",
  "slug": "rebuilding-trust-journalism-age-misinformation",
  "excerpt": "How news organizations can reclaim public trust and combat the rise of misinformation in increasingly polarized media landscapes.",
  "content": "<h3>The Journalism Crisis</h3>\n\nIn an era where <strong>\"fake news\"</strong> has become a ubiquitous term and trust in media institutions has plummeted to historic lows, journalism faces an existential crisis. The fragmentation of media ecosystems, algorithmic amplification of divisive content, and the collapse of traditional business models have created perfect conditions for misinformation to flourish. Yet, the need for <strong>reliable, factual reporting</strong> has never been more crucial for the functioning of our democracy.\n\n<h3>Declining Public Trust</h3>\n\nThe statistics tell a sobering story. According to the most recent Gallup polls, <strong>Americans' trust in mass media has fallen to just 34%</strong>, down from 72% in 1976. This decline has accelerated dramatically in the last decade, particularly along partisan lines. The erosion of this trust represents more than just a challenge for media companies' bottom lines—it threatens the very foundation of informed civic participation.\n\n<h3>The Systemic Issues</h3>\n\nWhile much attention focuses on political polarization as the primary driver of media distrust, the reality is <strong>more complex and systemic</strong>. The collapse of local news ecosystems has left information vacuums that are often filled by partisan national outlets or unverified social media content. The transition to digital business models that prioritize engagement has incentivized <strong>inflammatory content over nuanced reporting</strong>.\n\n<h3>Steps to Rebuild Trust</h3>\n\nRecovering public confidence requires more than cosmetic changes. It demands <strong>radical transparency</strong> about journalistic processes, distinguishing clearly between reporting and opinion, embracing expertise while acknowledging knowledge limitations, and developing business models that reward excellence rather than mere engagement.\n\n<h3>Practical Solutions</h3>\n\n<ul>\n  <li>Implementing <strong>unmistakable visual signals</strong> separating news from analysis</li>\n  <li>Providing <strong>methodology notes</strong> with major stories</li>\n  <li>Investing in <strong>news literacy programs</strong></li>\n  <li>Prioritizing <strong>accountability reporting</strong> over access journalism</li>\n</ul>\n\n<h3>The Stakes for Democracy</h3>\n\nThe collapse of trusted information sources isn't just a problem for journalists—it represents an <strong>existential threat to democratic governance</strong>. Without trusted intermediaries to investigate and contextualize information about public affairs, citizens cannot make informed decisions or hold leaders accountable.\n\nNews organizations that rise to this challenge—recommitting to fundamental values while evolving practices for a digital age—won't just survive the current crisis. They will help ensure that <strong>democratic self-governance</strong> doesn't become yet another casualty of our fractured information ecosystem.\n",
  "imageUrl": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80",
  "categoryId": 7,
  "author": "Miraj Shafek",
  "publishedAt": "2025-03-18T09:30:00Z",
  "isFeatured": 0
},
      {
  "title": "Bangladesh's July Revolution: A Turning Point in History",
  "slug": "bangladesh-july-revolution-turning-point-history",
  "excerpt": "How a student-led protest against civil service quotas transformed into a nationwide movement that toppled Sheikh Hasina's government in Bangladesh.",
  "content": "<h3>A Historic Uprising</h3>\n\nThe July Revolution of 2024 in Bangladesh stands as one of the most significant political uprisings in the nation's history, fundamentally altering the country's trajectory nearly eight months after the events unfolded.\n\nWhat began as student-led protests against the reinstatement of civil service recruitment quotas rapidly evolved into a widespread movement challenging Prime Minister Sheikh Hasina's government, ultimately leading to her resignation and exile on August 5, 2024.\n\n<h3>The Spark That Ignited the Movement</h3>\n\nThe initial protests erupted when the government reintroduced a controversial quota system for civil service jobs. Young graduates, facing high unemployment rates, viewed this as an unjust policy that favored certain groups over merit-based recruitment.\n\n\"The quota system was the final straw,\" said Zunayed Al Aadib, a protest organizer and student at Dhaka University. \"We were fighting for a system that <strong>prioritized competence over connections</strong>.\"\n\nDemonstrations that began on university campuses quickly spread nationwide, with protesters adopting the slogan \"No quota, only merit.\"\n\n<h3>From Student Protests to National Uprising</h3>\n\nWhat distinguishes the July Revolution from previous protests was its rapid transformation from a specific grievance to broader demands for democratic reform. When security forces responded with violence, killing several students on July 16, public outrage intensified.\n\n\"After the killings, it wasn't just about quotas anymore,\" said Dr. Rehana Ahmed, political analyst at the Bangladesh Institute of Development Studies. \"It became about <strong>systematic corruption, electoral manipulation, and authoritarian governance</strong>.\"\n\nSocial media played a crucial role, with protesters using platforms like Facebook and Telegram to organize demonstrations and document abuses, despite government-imposed internet restrictions.\n\n<h3>The Fall of a Government</h3>\n\nBy late July, millions of Bangladeshis from all walks of life had joined the protests. Government buildings were occupied, and police stations abandoned as security forces increasingly refused orders to fire on demonstrators.\n\nThe 15-year rule of Sheikh Hasina ended on August 5, when she fled to India. An interim government led by Nobel laureate Muhammad Yunus was established with a mandate to <strong>reform electoral systems and investigate human rights abuses</strong>.\n\n<h3>Moving Forward</h3>\n\nThe interim government has initiated significant reforms, including abolishing the controversial quota system and establishing an independent commission to investigate the violence during the protests.\n\n\"What happened in Bangladesh demonstrates that peaceful mass movements can succeed against entrenched authoritarian systems,\" said international observer James Wilson. \"The challenge now is translating revolutionary energy into sustainable democratic institutions.\"\n\nElections are scheduled for September 2025, with hopes that they will mark Bangladesh's transition to a more transparent and inclusive democracy.\n\nFor many Bangladeshis, the July Revolution represents not just a political victory but a reclamation of national identity and democratic aspirations.",
  "imageUrl": "https://www.aljazeera.com/wp-content/uploads/2024/08/AP24218390125876-1722875844.jpg?resize=1920%2C1440",
  "categoryId": 5,
  "author": "Zunaed Al Aadib",
  "publishedAt": "2024-08-07T08:15:00Z",
  "isFeatured": 0
}

    ];
    
    sampleArticles.forEach(article => {
      this.createArticle(article);
    });
  }
}

export const storage = new MemStorage();

