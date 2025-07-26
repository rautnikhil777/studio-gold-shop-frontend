// src/utils/imageUrl.js
import imageUrlBuilder from "@sanity/image-url";
// import client from "../sanityClient"; // 👈 Yeh tabhi chalega jab default export use ho
import { client } from "../sanityClient"; // ✅ Match named export

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
