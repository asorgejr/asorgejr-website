import Author from './author'


export interface PostSchema {
  /** (ObjectId) The unique identifier of the post */
  _id: string
  /** The url-friendly name of the post */
  name: string
  /** The presented title of the post */
  title: string
  /** ISO 8601 date string */
  date: string
  /** An array of static paths to different sizes of the image, where the first element is the largest size and subsequent elements are smaller sizes */
  coverImage: string[]
  /** (ObjectId) string */
  content: string
  /** (ObjectId) string */
  author: string
}

export interface IPost {
  /** The unique identifier of the post */
  _id: string
  /** The url-friendly name of the post */
  name: string
  /** The presented title of the post */
  title: string
  /** The date the post was published */
  date: string
  /** 
   * The cover image for the post.
   * This should be an array of static paths to different sizes of the image, where the first element is the largest
   * size and subsequent elements are smaller sizes.
   * The first element will be used as the background image for the post.
   */
  coverImage: string[]
  author: Author
  /** A short excerpt of the post */
  excerpt: string
  /** 
   * The full content of the post
   * This should be in Markdown format.
   * Currently, bullet points and headings smaller than h3 are not supported.
   */
  content: string
}

export class Post implements IPost {
  _id: string
  name: string
  title: string
  date: string
  coverImage: string[]
  author: Author
  excerpt: string
  content: string
  
  constructor(post: IPost) {
    this._id = post._id;
    this.name = post.name;
    this.title = post.title;
    this.date = post.date;
    this.coverImage = post.coverImage;
    this.author = post.author;
    this.excerpt = post.excerpt;
    this.content = post.content;
  }
}
