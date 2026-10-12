import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]`;

export const samplesQuery = groq`*[_type == "writingSample" && defined(slug.current)] | order(order asc, _createdAt desc){
  _id, title, "slug": slug.current, category, coverImage, excerpt, body, results, featured, order
}`;

const postSummaryFields = `
  _id, title, "slug": slug.current, coverImage, excerpt, tags, publishedAt, readTime,
  "wordCount": length(string::split(pt::text(body), " "))
`;

export const postsQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  ${postSummaryFields}
}`;

export const latestPostsQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  ${postSummaryFields}
}`;

export const postBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  ${postSummaryFields}, body
}`;

export const postSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)].slug.current`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc, _createdAt asc){
  _id, name, role, quote, avatar, order
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc, _createdAt asc){
  _id, title, description, icon, order
}`;
