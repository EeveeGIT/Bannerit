import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  backgroundType: text("background_type").notNull(), // color, animation, image
  backgroundValue: text("background_value").notNull(), // hex for color, animation-id for animations, url for images
  headingText: text("heading_text").notNull().default("Your Brand Message"),
  headingFont: text("heading_font").notNull().default("Poppins"),
  headingSize: integer("heading_size").notNull().default(24),
  headingColor: text("heading_color").notNull().default("#FFFFFF"),
  headingAlign: text("heading_align").notNull().default("center"),
  subText: text("sub_text").notNull().default("Discover our amazing products"),
  subTextFont: text("sub_text_font").notNull().default("Inter"),
  subTextSize: integer("sub_text_size").notNull().default(14),
  subTextColor: text("sub_text_color").notNull().default("#FFFFFF"),
  showCta: boolean("show_cta").notNull().default(false),
  ctaText: text("cta_text").default("Learn More"),
  ctaBackgroundColor: text("cta_background_color").default("#3B82F6"),
  ctaTextColor: text("cta_text_color").default("#FFFFFF"),
  ctaUrl: text("cta_url").default("https://example.com"),
  logoPath: text("logo_path"),
  logoPosition: text("logo_position").default("top-left"),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBannerSchema = createInsertSchema(banners).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = typeof banners.$inferSelect;
