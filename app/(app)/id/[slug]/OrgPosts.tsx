import { getContextualDate } from "lib/utils"
import Link from "next/link"
import { PostEditMenu } from "components/PostEditMenu"
import { IfLoggedIn } from "components/IfLoggedIn"

export function OrgPosts({ slug, posts }: { slug: string; posts: any[] }) {
  return (
    <ul className="">
      {posts.map(async ({ content, origin_server_ts, event_id }, i) => {
        return (
          <li
            key={i}
            className="mt-6 border-b border-[#1D170C33] pb-4 flex flex-col items-start">
            <span className="opacity-60 text-sm justify-self-start">
              {getContextualDate(origin_server_ts)}
            </span>
            <div className="flex w-full mt-1 justify-between items-center gap-2 mb-1">
              <div className="flex items-center gap-2">
                <Link href={`/id/${slug}/post/${event_id.split("$")[1]}`}>
                  <h4 className="text-lg font-bold font-body">
                    {content && "title" in content && content?.title}
                  </h4>
                </Link>
                {content?.author && (
                  <h5 className="text-sm font-body">
                    <Link
                      href={
                        `/orgs/${
                          content.author.id.split("!")[1].split(":")[0]
                        }` || ""
                      }>
                      with {content?.author?.name}
                    </Link>
                  </h5>
                )}
              </div>
              <IfLoggedIn>
                <PostEditMenu slug={slug} event_id={event_id} />
              </IfLoggedIn>
            </div>

            <p className="mt-4 pl-4 font-thin font-body whitespace-pre-line">
              {content?.body}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
