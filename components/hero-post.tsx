import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
  title: string
  picture: string
  content: string
  excerpt: string
  // author: string
  slug: string
}

const HeroPost = ({
  title,
  picture,
  content,
  excerpt,
  // author,
  slug,
}: Props) => {
  console.log(content)
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={picture} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
            <a>{title}</a>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={content} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {/* <Avatar name={author} /> */}
        </div>
      </div>
    </section>
  )
}

export default HeroPost
