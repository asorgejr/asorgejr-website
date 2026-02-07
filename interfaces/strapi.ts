export type StrapiAuthor = {
  id: number,
  name?: string,
  avatar?: StrapiImage | null,
};

export type StrapiImageFormat = {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  path: string | null,
  width: number,
  height: number,
  size: number,
  sizeInBytes: number,
  url: string,
};

export type StrapiImage = {
  url: string,
  formats?: Record<string, StrapiImageFormat>,
  alternativeText?: string | null,
};

export type StrapiPost = {
  id: number,
  slug: string,
  title: string,
  date: string,
  content: string,
  author?: StrapiAuthor | null,
  coverImage?: StrapiImage | null,
  ogImage?: StrapiImage | null,
};

export type StrapiPagination = {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number,
};

export type StrapiListResponse<T> = {
  data: T[]
  meta?: {
    pagination?: StrapiPagination
  }
}
