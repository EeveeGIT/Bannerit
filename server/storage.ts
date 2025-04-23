import { banners, type Banner, type InsertBanner, users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Banner storage methods
  createBanner(banner: InsertBanner & { createdAt: string }): Promise<Banner>;
  getBanner(id: number): Promise<Banner | undefined>;
  getAllBanners(): Promise<Banner[]>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bannersMap: Map<number, Banner>;
  currentUserId: number;
  currentBannerId: number;

  constructor() {
    this.users = new Map();
    this.bannersMap = new Map();
    this.currentUserId = 1;
    this.currentBannerId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createBanner(banner: InsertBanner & { createdAt: string }): Promise<Banner> {
    const id = this.currentBannerId++;
    const newBanner: Banner = { ...banner, id };
    this.bannersMap.set(id, newBanner);
    return newBanner;
  }
  
  async getBanner(id: number): Promise<Banner | undefined> {
    return this.bannersMap.get(id);
  }
  
  async getAllBanners(): Promise<Banner[]> {
    return Array.from(this.bannersMap.values());
  }
  
  async updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner | undefined> {
    const existingBanner = this.bannersMap.get(id);
    if (!existingBanner) {
      return undefined;
    }
    
    const updatedBanner = { ...existingBanner, ...banner };
    this.bannersMap.set(id, updatedBanner);
    return updatedBanner;
  }
  
  async deleteBanner(id: number): Promise<boolean> {
    return this.bannersMap.delete(id);
  }
}

export const storage = new MemStorage();
