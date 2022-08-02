import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Footer } from "components/Footer";
import { Landing } from "components/template/Landing";
import { RDLogo } from "components/RDLogo";
import client from "lib/apollo/client";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystone-next/document-renderer";
import { Back } from "components/Back";
import { GET_POST_SLUGS, GET_POST } from "lib/apollo/queries";

const componentBlocks = {
  cloudinaryImage: ({ image }: any) => {
    const data = image?.data;
    if (!image) return <div>No Image Selected</div>;

    //replace with Next Image if I can get image size from API
    return (
      <div className="relative max-w-xl max-h-full min-w-full">
        <img src={data?.image?.publicUrlTransformed} alt={data?.description} />
      </div>
    );
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await client.query({
    query: GET_POST_SLUGS,
  });

  return {
    paths: data.posts.map((post: { slug: string }) => ({
      params: { slug: post.slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params.slug gets the dynamic route
  try {
    const { data, error } = await client.query({
      query: GET_POST,
      variables: {
        // plug the route into the query
        slug: params?.slug,
      },
    });
    // error -> 404 (rather than just breaking)
    if (!data || error) return { notFound: true };
    // success! return the data
    return {
      props: {
        post: data.post,
      },
      // incremental static regeneration (no more than once every 10 seconds of someone being on page)
      revalidate: 10,
    };
  } catch {
    // different kind of error? -> 404
    return { notFound: true };
  }
};

type Props = {
  post: {
    title: string;
    content: DocumentRendererProps;
  };
};

const Post: NextPage<Props> = ({ post }: Props) => {
  return (
    <Landing title={post.title}>
      <RDLogo />

      <main className="article">
        <div className="flex-shrink-0 hidden p-4 xl:block h-2/5"> </div>

        <h2>{post.title}</h2>
        <DocumentRenderer
          document={post.content.document}
          componentBlocks={componentBlocks}
        />

        <Back />
        <Footer />
      </main>
    </Landing>
  );
};

export default Post;
