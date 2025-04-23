import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { join } from "path";
import multer from "multer";
import fs from "fs";
import path from "path";

// Configure multer for file uploads
const storage_dir = path.join(process.cwd(), "uploads");
// Create the uploads directory if it doesn't exist
if (!fs.existsSync(storage_dir)) {
  fs.mkdirSync(storage_dir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storage_dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Static file serving for uploads
  app.use("/uploads", express.static(storage_dir));

  // API routes
  app.post("/api/upload/logo", upload.single("logo"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      filePath,
    });
  });

  app.post("/api/upload/background", upload.single("background"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      filePath,
    });
  });

  app.post("/api/banners", async (req, res) => {
    try {
      const banner = await storage.createBanner({
        ...req.body,
        createdAt: new Date().toISOString(),
      });
      res.json(banner);
    } catch (error) {
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Error creating banner" 
      });
    }
  });

  app.get("/api/banners", async (req, res) => {
    const banners = await storage.getAllBanners();
    res.json(banners);
  });

  app.get("/api/banners/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const banner = await storage.getBanner(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(banner);
  });

  const httpServer = createServer(app);

  return httpServer;
}
