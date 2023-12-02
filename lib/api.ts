import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'
import {IPost, Post, PostSchema} from "@/interfaces/post";
import Author from "@/interfaces/author";

const kOidLength = 24;
const kPostsDirectory = join(process.cwd(), '_posts');
const kApiUrl = process.env.API_URL;
const kPageLimit = 10;
const kGlobalHeaders = {
  'Content-Type': 'application/json'
};



/**
 * Fetch with timeout
 * @param input
 * @param init
 * @param timeout
 */
async function tfetch(input: RequestInfo, init?: RequestInit | undefined, timeout: number = 5000): Promise<Response|null> {
  return await Promise.race([
    fetch(input, init),
    new Promise(resolve => {
      setTimeout(resolve, timeout);
    }).then(() => {
      // console.error(`Request timed out after ${timeout}ms`);
      return null;
    })
  ]);
}

export class ApiOptions {
  timeout: number = 5000;
  constructor() {
  }
}

export class Api {
  static _options: ApiOptions = new ApiOptions();
  
  public static set options(options: ApiOptions) {
    this._options = options;
  }
  public static get options(): ApiOptions {
    return this._options;
  }

  static _getPostSlugs() {
    return fs.readdirSync(kPostsDirectory)
  }

  public static getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(kPostsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)

    type Items = {
      [key: string]: string
    }

    const items: Items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug
      }
      if (field === 'content') {
        items[field] = content
      }
      if (typeof data[field] !== 'undefined') {
        items[field] = data[field]
      }
    });

    return items;
  }
  
  public static async getAllPostSlugs(fields: string[] = []) {
    const slugs = Api._getPostSlugs();
    const posts = slugs
      .map((slug) => Api.getPostBySlug(slug, fields))
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  }
  
  static _validateId(id: string): boolean {
    return !(!id) && id.length === kOidLength && /^[a-f\d]{24}$/i.test(id);
  }

  /**
   * Get user by id
   * @param id (`bson.ObjectId` format) The id of the user
   * @throws {Error} If the request fails
   */
  public static async getUserById(id: string): Promise<Author> {
    if (!Api._validateId(id)) {
      throw new Error(`Invalid id '${id}'`);
    }
    let response = await tfetch(`${kApiUrl}/users/${id}`, {
      method: 'GET',
      headers: {
        ...kGlobalHeaders
      }
    });
    if (response === null || !response.ok) {
      throw new Error(`Failed to fetch user for id '${id}'`);
    }
    let item = await response.json();
    return {
      name: item.name,
      picture: item.img
    } as Author;
  }

  /**
   * Get content by id
   * @param id (`bson.ObjectId` format) The id of the content
   * @throws {Error} If the request fails
   */
  public static async getContentById(id: string): Promise<string> {
    if (!Api._validateId(id)) {
      throw new Error(`Invalid id '${id}'`);
    }
    let response = await tfetch(`${kApiUrl}/content/${id}`, {
      method: 'GET',
      headers: {
        ...kGlobalHeaders
      }
    });
    if (response === null || !response.ok) {
      throw new Error(`Failed to fetch content for id '${id}'`);
    }
    let item = await response.json();
    return item.content;
  }

  /**
   * Hydrate a post object with author and content
   * @param post The post to hydrate
   * @throws {Error} Errors from `Api.getUserById` and `Api.getContentById` will bubble up
   */
  static async _hydratePost(post: PostSchema) {
    let author = await Api.getUserById(post.author);
    let content = await Api.getContentById(post.content);
    return new Post({
      _id: post._id,
      name: post.name,
      title: post.title,
      date: post.date,
      coverImage: post.coverImage,
      author: author,
      content: content,
      excerpt: ""
    });
  }
  
  /**
   * Get a post by id
   * @param id The id of the post
   * @throws {Error} If the request fails
   */
  public static async getPostById(id: string) {
    if (!Api._validateId(id)) {
      throw new Error(`Invalid id '${id}'`);
    }
    let response = await tfetch(`${kApiUrl}/posts/${id}`, {
      method: 'GET',
      headers: {
        ...kGlobalHeaders
      }
    });
    if (response === null || !response.ok) {
      throw new Error(`Failed to fetch post for id '${id}'`);
    }
    let post = await response.json() as PostSchema;
    return await Api._hydratePost(post);
  }
  

  /**
   * Get a post by name
   * @param name The name of the post
   * @throws {Error} If the request fails
   */
  public static async getPostByName(name: string) {
    let response = await tfetch(`${kApiUrl}/posts?name=${name}`, {
      method: 'GET',
      headers: {
        ...kGlobalHeaders
      }
    });
    if (response === null || !response.ok) {
      throw new Error(`Failed to fetch post for name '${name}'`);
    }
    let post = await response.json() as PostSchema;
    return await Api._hydratePost(post);
  }

  /**
   * Get all posts
   * @param page The page number to fetch
   * @throws {Error} If the request fails
   */
  public static async getAllPosts(page = 1): Promise<PostSchema[]> {
    let response = await tfetch(`${kApiUrl}/posts?limit=${kPageLimit}&page=${page}`, {
      method: 'GET',
      headers: {
        ...kGlobalHeaders
      }
    });
    if (response === null || !response.ok) {
      throw new Error(`Failed to fetch posts`);
    }
    const ret = await response.json() as PostSchema[];
    if (!ret || !ret.length) {
      console.error(`No posts found`);
      return [];
    }
    return ret;
  }
}
