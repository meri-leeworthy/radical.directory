import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Footer } from "components/Footer";
import { Page } from "components/Page";
import { Back } from "components/Back";
import { gql } from "@apollo/client";
import client from "apollo-client";
import { Node } from "slate";
import { RDLogo } from "components/RDLogo";

const GET_POSTS = gql`
  query {
    # don't fetch posts where there is no author
    posts(where: { NOT: { author: null } }) {
      slug
      title
      author {
        name
      }
      content {
        document
      }
    }
  }
`;

type Post = {
  slug: string;
  title: string;
  author: {
    name: string;
  };
  content: {
    document: Node[];
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // turn Slate notes into a string of plaintext.
  const serialize = (nodes: Node[]) => {
    const shortNodes = nodes.slice(0, 2);
    const stringText = shortNodes.map((n) => Node.string(n)).join("\n");
    // if over 100 char, truncate with "..."
    return stringText.slice(0, 100) + (stringText.length > 100 ? "..." : "");
  };

  // apply the serialisation to the document property on each post in posts array, return as 'snippet' property
  const getSnippets = (posts: Post[]) => {
    return posts.map((post) => {
      return {
        ...post,
        author: post.author.name,
        content: {
          snippet: serialize(post.content.document),
        },
      };
    });
  };

  try {
    const { data, error } = await client.query({
      query: GET_POSTS,
      variables: {
        slug: params?.slug,
      },
    });
    // error -> 404 (rather than just breaking)
    if (!data || error) return { notFound: true };
    return {
      props: {
        // return modified data
        posts: getSnippets(data.posts),
      },
      revalidate: 10,
    };
  } catch {
    // different kind of error? -> 404
    return { notFound: true };
  }
};

type Props = {
  posts: {
    title: string;
    slug: string;
    author: string;
    content: {
      snippet: string;
    };
  }[];
};

const Writing: NextPage<Props> = ({ posts }: Props) => {
  return (
    <Page title="Writing">
      <RDLogo />

      <main className="article">
        <div className="hidden xl:block p-4 h-2/5 flex-shrink-0"> </div>
        <h2>Writing</h2>
        {posts.map((post) => {
          return (
            <div key={post.slug}>
              <Link href={"/post/" + post.slug}>
                <a className="a-unstyled">
                  <h3>{post.title}</h3>
                  <p className="text-muted">{post.content.snippet}</p>
                  <p className="text-muted author-line">{post.author}</p>

                  <hr />
                </a>
              </Link>
            </div>
          );
        })}

        <Back />

        <Footer />
      </main>
    </Page>
  );
};

export default Writing;
