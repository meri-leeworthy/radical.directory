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

// query for a single post by slug
const GET_PAGE = gql`
  query ($slug: String) {
    post(where: { slug: $slug }) {
      title
      content {
        document
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      // static generate these post pages at build time
      {
        params: {
          slug: "open-letter",
        },
      },
    ],
    // if the page wasn't pre-generated, force the user to wait for the server to generate it
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
        <DocumentRenderer document={post.content.document} />

        <Back />
        <Footer />
      </main>
    </Page>
  );
};

export default Post;
