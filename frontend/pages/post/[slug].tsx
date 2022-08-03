import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Footer } from "components/Footer";
import { Landing } from "components/template/Landing";
import { RDLogo } from "components/RDLogo";
import { Back } from "components/Back";
import { postFilePaths, POSTS_PATH } from "lib/mdxUtils";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "../writing";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: postFilePaths.map((filePath) => ({
      params: { slug: filePath.slice(0, -4) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string) || "";
  const source = readFileSync(path.join(POSTS_PATH, slug + ".mdx"));

  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return { props: { post: { data, slug, source: mdxSource } } };
};

type Props = {
  post: Post & { source: MDXRemoteSerializeResult };
};

const Post: NextPage<Props> = ({ post }: Props) => {
  const components = {};

  return (
    <Landing title={post.data.title}>
      <RDLogo />

      <main className="article">
        <div className="flex-shrink-0 hidden p-4 xl:block h-2/5"> </div>

        <h2>{post.data.title}</h2>
        <MDXRemote {...post.source} components={components} />

        <Back />
        <Footer />
      </main>
    </Landing>
  );
};

export default Post;
