import logger from './logger';
import {
  StrapiPagination, StrapiPost, StrapiListResponse
} from '../interfaces/strapi';

const strapiUrl = process.env.STRAPI_API_URL || '';
const strapiApiToken = process.env.STRAPI_API_TOKEN;

const headers: Record<string, string> = strapiApiToken
  ? { Authorization: `Bearer ${strapiApiToken}` }
  : {};

const populates = ['coverImage', 'ogImage', 'author.avatar'];


export async function getPosts(opts: {
  page: number,
  pageSize: number,
  sort?: string,
}): Promise<{ posts: StrapiPost[]; pagination: StrapiPagination | null }> {
  const {
    page, pageSize, sort = 'date:desc',
  } = opts;

  const params: Record<string, string | number | boolean | undefined> = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    'sort[0]': sort,
  };

  try {
    const url = withPopulates(`${strapiUrl}/api/posts`, buildQuery(params), buildPopulates(populates));
    const json = await fetchJson<StrapiListResponse<StrapiPost>>(url, { headers });
    const pagination = json.meta?.pagination || null;
    return { posts: json.data || [], pagination };
  } catch (error) {
    logger.error('[getPosts] failed to get posts', { error });
    throw error;
  }
}

export async function getPostBySlug(slug: string, fields: string[] = []): Promise<Partial<StrapiPost> | null> {
  // Detail endpoint.
  const params: Record<string, string> = {
    'filters[slug][$eq]': slug,
  };
  try {
    const url = withPopulates(`${strapiUrl}/api/posts`, buildQuery(params), buildPopulates(populates));
    const json = await fetchJson<StrapiListResponse<StrapiPost>>(url, { headers });
    const post = (json.data && json.data[0]) as StrapiPost | undefined;
    if (!post) return null;
    if (!fields.length) return post;
    
    const postResponse: Partial<StrapiPost> = {};
    
    // Ensure only the minimal needed data is exposed.
    for (const field of fields) {
      if (typeof post[field] !== 'undefined') {
        postResponse[field] = post[field];
      }
    }

    return postResponse as StrapiPost;
  } catch (error) {
    logger.error('[getPostBySlug] failed to get post by slug', { error });
    throw error;
  }
}


async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText} (${url}) ${body}`);
  }
  return res.json();
}

function buildPopulates(fields: readonly string[]): string {
  const qs = new URLSearchParams();
  for (const keyPath of fields) {
    let populateBuilder = 'populate';
    const path = keyPath.split('.');
    path.forEach((p, j) => {
      if (j > 0) populateBuilder += `[populate]`;
      populateBuilder += `[${p}]`;
    });
    qs.set(populateBuilder, 'true');
  }
  return qs.toString();
}

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === 'undefined') continue;
    usp.set(k, String(v));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

function withPopulates(baseUrl: string, query: string, populateQs: string): string {
  const joiner = query ? '&' : '?';
  return `${baseUrl}${query}${populateQs ? `${joiner}${populateQs}` : ''}`;
}
