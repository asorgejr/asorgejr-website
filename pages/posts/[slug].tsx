'use server';
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "@/components/container";
import PostBody from "@/components/post-body";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import Layout from "@/components/layout";
import PostTitle from "@/components/post-title";
import markdownToHtml from "@/lib/markdownToHtml";
import { POSTS_DEFAULT_FETCH } from "@/lib/constants";
import type PostType from "@/interfaces/post";
import { getDesiredImageFormatData } from "@/utils/image";

const fallbackImage = "/assets/images/del-mar-selfie-layer1.png";

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const router = useRouter();
  const {
    title = "Anthony Sorge's Blog",
    ogImage = { url: fallbackImage },
    content = "",
    date = "",
    coverImage,
    author,
  } = post;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const coverImageData = coverImage && getDesiredImageFormatData(coverImage, "large") || null;
  const ogImageData = ogImage && getDesiredImageFormatData(ogImage, "large") || null;
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={ogImageData?.url || ""} />
              </Head>
              <PostHeader
                title={title}
                coverImage={coverImageData?.url || ""}
                date={date}
                author={author}
              />
              <PostBody content={content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const Api = await import("@/lib/api");
  const post = await Api.getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  if (!post) {
    return { notFound: true, revalidate: 30 };
  }
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
    // ISR: keep the page fast while periodically refreshing from Strapi.
    revalidate: Number(process.env.NEXT_PUBLIC_POST_REVALIDATE_SECONDS || 300),
  };
}

export async function getStaticPaths() {
  const Api = await import("@/lib/api");
  const { posts } = await Api.getPosts({
    ...POSTS_DEFAULT_FETCH,
  });

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}
