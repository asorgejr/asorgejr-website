import Head from "next/head";
import Post from "@/interfaces/post";
import { POSTS_DEFAULT_FETCH } from "@/lib/constants";
import Layout from "@/components/layout";
import BlogComponent from "@/components/blog/blog";


type Props = {
  posts: Post[],
  page: number,
  pageCount: number,
}

export default function Blog({ posts, page, pageCount }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`ANTHONY SORGE | Blogs`}</title>
        </Head>
        <BlogComponent displayFirstPostAsHero={true} posts={posts} page={page} pageCount={pageCount} />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const Api = await import("@/lib/api");
  const { posts, pagination } = await Api.getPosts({
    ...POSTS_DEFAULT_FETCH,
  });

  return {
    props: {
      posts,
      page: pagination.page,
      pageCount: pagination.pageCount,
    },
    revalidate: Number(process.env.NEXT_PUBLIC_POSTS_REVALIDATE_SECONDS || 300),
  };
};
