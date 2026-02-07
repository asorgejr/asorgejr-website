import BlogsGrid from "@/components/blogs-grid";
import Container from "@/components/container";
import HeroPost from "@/components/hero-post";
import Post from "@/interfaces/post";
import PaginationFooter from "@/components/blog/pagination-footer";


type Props = {
  displayFirstPostAsHero: boolean,
  posts: Post[],
  page: number,
  pageCount: number,
}

export default function Blog({ displayFirstPostAsHero, posts, page, pageCount }: Props) {
  const heroPost = displayFirstPostAsHero && posts[0] || null;
  const morePosts = displayFirstPostAsHero && posts.slice(1) || posts;
  
  return (
    <Container>
      <div className="h-8" />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <BlogsGrid posts={morePosts} />}
      <PaginationFooter page={page} pageCount={pageCount} />
    </Container>
  );
}
