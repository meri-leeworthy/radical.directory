import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Footer } from "components/Footer";
import { Page } from "components/Page";
import { RDLogo } from "components/RDLogo";
import { gql } from "@apollo/client";
import client from "lib/apollo-client";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystone-next/document-renderer";
import { Back } from "components/Back";

//fetch slugs of all posts
const GET_POSTS = gql`
  query {
    posts {
      slug
    }
  }
`;

// query for a single post by slug
const GET_PAGE = gql`
  query ($slug: String) {
    post(where: { slug: $slug }) {
      title
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`;

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
    query: GET_POSTS,
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
      query: GET_PAGE,
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
    <Page title={post.title}>
      <RDLogo />

      <main className="article">
        <div className="hidden xl:block p-4 h-2/5 flex-shrink-0"> </div>

        <h2>{post.title}</h2>
        <DocumentRenderer
          document={post.content.document}
          componentBlocks={componentBlocks}
        />

        <Back />
        <Footer />
      </main>
    </Page>
  );
};

export default Post;
