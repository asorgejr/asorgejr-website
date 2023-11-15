import Post from "@/interfaces/post";
import Head from "next/head";
import Container from "@/components/container";
import HeroPost from "@/components/hero-post";
import BlogsGrid from "@/components/blogs-grid";
import {Api} from "@/lib/api";
import {Navbar} from "@/components/navbar";
import Layout from "@/components/layout";


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
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <BlogsGrid posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = Api.getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
