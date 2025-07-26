// src/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client banao
const client = createClient({
  projectId: "uevnwg2e",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-05",
});

// Image url builder banao
const builder = imageUrlBuilder(client);

// Helper function - image URL banane ke liye
export function urlFor(source) {
  return builder.image(source);
}

// YEH LINE MOST IMPORTANT HAI 👇
export { client }; // Yahan se 'client' named export ho raha hai

export default client; // Default export bhi rahe (agar aap kahin use kar rahe ho toh)
