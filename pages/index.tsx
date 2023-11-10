import Container from '@/components/container'
import BlogsGrid from '@/components/blogs-grid'
import Layout from '@/components/layout'
import {Api} from '@/lib/api'
import Head from 'next/head'
import Post from '@/interfaces/post'
import {BannerLayer, ParallaxBanner, ParallaxProvider} from "react-scroll-parallax";
import {TextBanner, TextBannerVariant} from "@/components/text-banner";
import SkillsTable from "@/components/skills-table";

type Props = {
  allPosts: Post[]
}



export default function Index({ allPosts }: Props) {
  const fgOffset = 20;
  const heroBg: BannerLayer = {
    image: '/assets/images/del-mar-selfie-layer1.png',
    speed: -3,

  }
  const heroFg: BannerLayer = {
    image: '/assets/images/del-mar-selfie-layer2.png',
    speed: 5,
  }
  const heroDarkOverlay: BannerLayer = {
    children: <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black opacity-50" />,
    speed: 0,
  }
  const heroText: BannerLayer = {
    children: (
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-tight md:pr-8 text-white">
          Anthony Sorge
        </h1>
        <div className="h-4" />
        <h6 className="text-2xl md:text-3xl font-light tracking-tighter leading-tight md:pr-8 text-white">
          Software Engineer
        </h6>
      </div>
    ),
    speed: 0,
  }
  
  return (
    <Layout>
      <Head>
        <title>{`ANTHONY SORGE`}</title>
      </Head>
      <ParallaxProvider>
        <ParallaxBanner style={{ aspectRatio: '2/1'}}
          className="md:aspect-[2/1] aspect-[1.5/1]"
          layers={[heroBg, heroFg, heroDarkOverlay, heroText]}
        />
      </ParallaxProvider>
      <>
        <TextBanner heading={"Background"} variant={TextBannerVariant.Dark} content={(
          <p>
            I am a software engineer with a passion for building products that make a difference in people's lives.
            I began my career as a hobbyist, programming small games and websites. I quickly realized that I had a
            passion for programming and decided to pursue it as a career. In 2018, I founded a mobile game studio
            called <a href="https://bcsgames.com" className="text-link"> BCS Games</a> with several colleagues.
            During this time, I learned a lot about the business side of software development and how to build a
            product from the ground up. In 2022, I decided to pivot towards web development and have devoted my time
            to learning the ins and outs of popular web frameworks such as React and Next.js, as well as API
            development with AWS. I am currently looking for a full-time position as a software engineer.
          </p>
        )} />
        <TextBanner heading={"Skills"} variant={TextBannerVariant.Light} content={(
          <SkillsTable />
        )} />
        <TextBanner heading={"About Me"} variant={TextBannerVariant.Dark} content={(
          <p>
            I'm a San Diego native.  
          </p>
        )}/>
        <Container>
          <div className="pt-8">
            <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">Posts</h2>
            {allPosts.length > 0 && <BlogsGrid posts={allPosts} limit={2} />}
          </div>
        </Container>
      </>
    </Layout>
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
