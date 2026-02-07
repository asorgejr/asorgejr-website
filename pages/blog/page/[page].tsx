import BlogComponent from "@/components/blog/blog";

const PAGE_SIZE = 6;
// how many pages to prebuild at build time:
const PREBUILD_PAGES = 3;

export async function getStaticPaths() {
  const paths = Array.from({ length: PREBUILD_PAGES }, (_, i) => ({
    params: { page: String(i + 2) },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const Api = await import("@/lib/api");
  const page = Math.max(2, parseInt(params.page, 10) || 2);

  const { posts, pagination } = await Api.getPosts({
    page,
    pageSize: PAGE_SIZE,
    sort: 'date:desc',
  });

  if (page > pagination.pageCount) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      posts,
      page: pagination.page,
      pageCount: pagination.pageCount,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_POSTS_REVALIDATE_SECONDS || 300),
  };
}

export default function BlogPageN({ posts, page, pageCount }) {
  return (
    <>
      <BlogComponent displayFirstPostAsHero={false} posts={posts} page={page} pageCount={pageCount} />
    </>
  );
}
