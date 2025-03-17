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
      { name: 'Sports', slug: 'sports' }
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

As part of its milestone celebration, MedVisual also launched its official website (<a href="https://medvisual.netlify.app/" target="_blank">https://medvisual.netlify.app/</a>), providing a comprehensive glimpse into its vision, progress, and upcoming innovations. The site highlights the startup's achievements so far, showcasing its team, products, and the long-term impact it hopes to achieve. With a dedicated team of experts and a forward-thinking approach, MedVisual is poised to leave a lasting and positive impact on Bangladesh's healthcare landscape, paving the way for similar transformations in other emerging markets. The team's innovative efforts and commitment to progress reflect their ambition to revolutionize the future of healthcare, not only in Bangladesh but across the globe.`,
  imageUrl: 'https://images.unsplash.com/photo-1742229062571-2006d23b9371?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  categoryId: 3, // Technology
  author: 'Editorial Team',
  publishedAt: new Date('2025-02-14T10:00:00Z').toISOString(),
  isFeatured: 1
}
    ];
    
    sampleArticles.forEach(article => {
      this.createArticle(article);
    });
  }
}

export const storage = new MemStorage();

