import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Footer } from "components/Footer";
import { Landing } from "components/template/Landing";
import { Back } from "components/Back";
import { gql } from "@apollo/client";
import client from "lib/apollo/client";
import { RDLogo } from "components/RDLogo";

const GET_POSTS = gql`
  query {
    posts {
      slug
      title
      authorString
      snippet
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data, error } = await client.query({
      query: GET_POSTS,
    });
    // error -> 404 (rather than just breaking)
    if (!data || error) return { notFound: true };
    return {
      props: {
        // return modified data
        posts: data.posts,
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
    authorString: string;
    snippet: string;
  }[];
};

const Writing: NextPage<Props> = ({ posts }: Props) => {
  return (
    <Landing title="Writing">
      <RDLogo />

      <main className="article">
        <div className="flex-shrink-0 hidden p-4 xl:block h-2/5"> </div>
        <h2>Writing</h2>
        {posts.map((post) => {
          return (
            <div key={post.slug}>
              <Link href={"/post/" + post.slug}>
                <a className="a-unstyled">
                  <h3>{post.title}</h3>
                  <p className="text-muted">{post.snippet}</p>
                  <p className="text-muted author-line">{post.authorString}</p>

                  <hr />
                </a>
              </Link>
            </div>
          );
        })}

        <Back />

        <Footer />
      </main>
    </Landing>
  );
};

export default Writing;
