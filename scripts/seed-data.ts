import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../src/data/products";
import { categories } from "../src/data/categories";

const dataDir = resolve(import.meta.dirname, "../data");
const productsPath = resolve(dataDir, "products.json");
const categoriesPath = resolve(dataDir, "categories.json");

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const force = process.argv.includes("--force");

function writeIfNeeded(path: string, data: unknown, label: string) {
  if (existsSync(path) && !force) {
    console.log(`${label} already exists at ${path} — skipping (use --force to overwrite).`);
    return;
  }
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
  console.log(`Wrote ${label} to ${path}`);
}

writeIfNeeded(productsPath, products, "products.json");
writeIfNeeded(categoriesPath, categories, "categories.json");
