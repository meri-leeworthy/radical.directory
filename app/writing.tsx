// "use client"

// import type { NextPage, GetStaticProps } from "next"
// import Link from "next/link"
// import { Footer } from "components/Footer"
// import { Landing } from "components/template/Landing"
// import { Back } from "components/Back"
// import { RDLogo } from "components/RDLogo"
// import { readFileSync } from "fs"
// import path from "path"
// import { postFilePaths, POSTS_PATH } from "lib/mdxUtils"
// import matter from "gray-matter"

// export interface Post {
//   content?: string
//   data: {
//     title: string
//     author: string
//   }
//   slug: string
// }

// type Props = {
//   posts: Post[]
// }

// // export const getStaticProps: GetStaticProps = async () => {
// //   const posts = postFilePaths.map(filePath => {
// //     const source = readFileSync(path.join(POSTS_PATH, filePath))
// //     const { content, data } = matter(source)
// //     const slug = filePath.slice(0, -4)
// //     return {
// //       content,
// //       data,
// //       slug,
// //     }
// //   })

// //   return { props: { posts } }
// // }

// const Writing: NextPage<Props> = ({ posts }: Props) => {
//   return (
//     <Landing title="Writing">
//       <RDLogo />

//       <main className="article">
//         <div className="flex-shrink-0 hidden p-4 xl:block h-2/5"> </div>
//         <h2>Writing</h2>
//         {posts.map(post => {
//           return (
//             <div key={post.slug}>
//               <Link href={"/post/" + post.slug}>
//                 <a className="a-unstyled">
//                   <h3>{post.data.title}</h3>
//                   <p className="text-muted">
//                     {post.content?.slice(0, 200) +
//                       (post.content && post.content.length > 200 ? "..." : "")}
//                   </p>
//                   <p className="text-muted author-line">{post.data.author}</p>

//                   <hr />
//                 </a>
//               </Link>
//             </div>
//           )
//         })}

//         <Back />

//         <Footer />
//       </main>
//     </Landing>
//   )
// }

// export default Writing
