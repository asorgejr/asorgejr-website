import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Author from '@/interfaces/author'
import markdownStyles from "@/components/markdown-styles.module.css";
import {ReactNode} from "react";

const kDefaultImg = '/assets/blog/default-banner.jpg';
const kDefaultAuthor = 'Unknown Author';

interface PostHeaderProps {
  title: string
  coverImage: string
  date: string
  author: Author
}

export const PostHeader = ({ title, coverImage, date, author }: PostHeaderProps) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name ?? kDefaultAuthor} picture={author.picture ?? kDefaultImg} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name ?? kDefaultAuthor} picture={author.picture ?? kDefaultImg} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter isoDate={date} />
        </div>
      </div>
    </>
  )
}



interface PostTitleProps {
  children?: ReactNode
}

export const PostTitle = ({ children }: PostTitleProps) => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}



interface PostBodyProps {
  content: string
}

export const PostBody = ({ content }: PostBodyProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
