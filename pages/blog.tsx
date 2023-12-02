import {IPost, Post, PostSchema} from "@/interfaces/post";
import Head from "next/head";
import Container from "@/components/container";
import HeroPost from "@/components/hero-post";
import BlogsGrid from "@/components/blogs-grid";
import {Api} from "@/lib/api";
import {Navbar} from "@/components/navbar";
import Layout from "@/components/layout";
import Author from "@/interfaces/author";


type Props = {
  allPosts: Post[]
}

export default function Blog({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  
  return (
    <>
      <Layout>
        <Head>
          <title>{`ANTHONY SORGE | Blogs`}</title>
        </Head>
        <Container>
          <div className="h-8" />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage.length > 0 ? heroPost.coverImage[0] : '/assets/blog/default-banner.jpg'}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.name}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <BlogsGrid posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  let allPosts: PostSchema[] = [];
  try {
    allPosts = await Api.getAllPosts();
  } catch (e) {
    console.log(`Error fetching posts: ${e}`);
    return {
      props: {
        allPosts: [],
      },
    }
  }
  // console.log(`allPosts: ${JSON.stringify(allPosts)}`);
  return {
    props: {
      allPosts: allPosts.map((post) => {
        return {
          _id: post._id,
          name: post.name,
          title: post.title,
          date: post.date,
          coverImage: post.coverImage,
          author: {
            name: null,
            picture: null,
          } as Author,
          excerpt: "",
          content: "",
        } as IPost;
      }),
    },
  }
}
