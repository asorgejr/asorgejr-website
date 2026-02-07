import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';
import { StrapiImage } from '@/interfaces/strapi';
import { getDesiredImageFormatData } from '@/utils/image';

type Props = {
  title: string
  coverImage: StrapiImage
  date: string
  excerpt: string
  slug: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) => {
  const formattedCoverImage = getDesiredImageFormatData(coverImage, 'medium');
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={formattedCoverImage.url} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter isoDate={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {/*<Avatar name={author.name} picture={author.picture} />*/}
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
