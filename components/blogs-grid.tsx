import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PostPreview from './post-preview'
import type Post from '@/interfaces/post'

type Props = {
  posts: Post[],
  limit?: number
}

const BlogsGrid = ({ posts, limit }: Props) => {
  if (limit) {
    posts = posts.slice(0, limit)
  }
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <section>
      {/*<h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">*/}
      {/*  Blogs*/}
      {/*</h2>*/}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32"
                  ref={ref}
                  variants={gridAnimVariants}
                  initial="hidden"
                  animate={controls}
      >
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default BlogsGrid

const gridAnimVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
}
