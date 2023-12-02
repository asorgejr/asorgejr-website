import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import Header from '@/components/header'
import {PostHeader, PostBody, PostTitle} from '@/components/post'
import Layout from '@/components/layout'
import { Api } from '@/lib/api'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import {IPost} from '@/interfaces/post'


const kDefaultImg = '/assets/blog/default-banner.jpg';

type Props = {
  post: IPost
  morePosts: IPost[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  const title = `${post.title}`
  if (!router.isFallback && !post?.name) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta 
                  property="og:image"
                  content={
                    post.coverImage.length > 0 ? post.coverImage[0] : kDefaultImg
                  }
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={
                  post.coverImage.length > 0 ? post.coverImage[0] : kDefaultImg
                }
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

interface Params {
  params: {
    name: string
  }
}


export async function getServerSideProps({ params }: Params) {
  // const post = params.id !== undefined ? await Api.getPostById(params.id) : await Api.getPostByName(params.name);
  const post = await Api.getPostByName(params.name);
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content: content,
      },
    },
  }
}

// export async function getStaticProps({ params }: Params) {
//   console.log('poo1')
//   const post = Api.getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'author',
//     'content',
//     'coverImage',
//   ]);
//   const content = await markdownToHtml(post.content || '')
//
//   return {
//     props: {
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }

// export async function getStaticPaths() {
//   const posts = await Api.getAllPosts(['slug'])
//
//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           slug: post.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }
