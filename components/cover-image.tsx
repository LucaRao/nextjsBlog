import cn from 'classnames'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string,
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <img
      src={src}
      style={{width:"auto"}}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'w-full': slug,
        'hover:shadow-lg transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
                  // <a aria-label={title}>{image}</a>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
