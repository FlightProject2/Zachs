// fs-backed JSON store — a stand-in persistence layer for local development
// until the catalog moves to Supabase. Only ever import this from files
// under src/server/, never from route/component code, so it stays out of
// the client bundle.
//
// Known limitation: this resolves data/ relative to this source file, which
// works for `npm run dev` and a same-layout production run, but a bundled
// serverless/edge deploy (Vercel, Netlify, Cloudflare) typically ships a
// read-only, ephemeral filesystem — writes here won't persist there. That's
// expected: this store exists to prove out the admin panel's shape now: the
// Supabase swap replaces the two functions in this file with query calls.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Product } from "../types/product";
import type { Category } from "../data/categories";

const DATA_DIR = resolve(import.meta.dirname, "../../data");
const PRODUCTS_PATH = resolve(DATA_DIR, "products.json");
const CATEGORIES_PATH = resolve(DATA_DIR, "categories.json");

async function readJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson(path: string, data: unknown): Promise<void> {
  if (!existsSync(dirname(path))) {
    await mkdir(dirname(path), { recursive: true });
  }
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export async function readProducts(): Promise<Product[]> {
  return readJson<Product[]>(PRODUCTS_PATH);
}

export async function writeProducts(products: Product[]): Promise<void> {
  return writeJson(PRODUCTS_PATH, products);
}

export async function readCategories(): Promise<Category[]> {
  return readJson<Category[]>(CATEGORIES_PATH);
}

export async function writeCategories(categories: Category[]): Promise<void> {
  return writeJson(CATEGORIES_PATH, categories);
}
