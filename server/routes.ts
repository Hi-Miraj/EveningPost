import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/articles/featured', async (req, res) => {
    const articles = await storage.getFeaturedArticles();
    res.json(articles);
  });

  app.get('/api/articles/latest', async (req, res) => {
    const articles = await storage.getLatestArticles();
    res.json(articles);
  });

  app.get('/api/articles/trending', async (req, res) => {
    const articles = await storage.getTrendingArticles();
    res.json(articles);
  });

  app.get('/api/articles/:slug', async (req, res) => {
    const article = await storage.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  });

  app.get('/api/categories', async (req, res) => {
    const categories = await storage.getAllCategories();
    res.json(categories);
  });

  app.get('/api/categories/:slug', async (req, res) => {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  });

  app.get('/api/articles/by-category/:slug', async (req, res) => {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const articles = await storage.getArticlesByCategoryId(category.id);
    res.json(articles);
  });

  const httpServer = createServer(app);

  return httpServer;
}
