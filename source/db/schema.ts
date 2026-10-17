import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sermonStreams = sqliteTable("sermon_streams", {
  videoId: text("video_id").primaryKey(),
  title: text("title").notNull(),
  publishedAt: text("published_at").notNull(),
  thumbnail: text("thumbnail").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const prayerRequests = sqliteTable("prayer_requests", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  request: text("request").notNull(),
  contactPermission: text("contact_permission").notNull(),
  confidentiality: text("confidentiality").notNull(),
  deliveryStatus: text("delivery_status").notNull().default("stored"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
