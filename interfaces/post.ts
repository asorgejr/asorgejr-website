import { StrapiAuthor, StrapiImage } from '@/interfaces/strapi';

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: StrapiImage
  author: StrapiAuthor
  excerpt: string
  ogImage: StrapiImage
  content: string
}

export default PostType;
