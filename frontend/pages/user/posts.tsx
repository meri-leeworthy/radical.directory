import type { NextPage } from "next";
import Link from "next/link";
import { Footer } from "components/Footer";
import { App } from "components/template/App";
import { Back } from "components/Back";
import { gql, useQuery } from "@apollo/client";
import { RDLogo } from "components/RDLogo";
import { authenticatedUserVar } from "lib/apollo/cache";

const GET_USER_POSTS = gql`
  query ($id: ID!) {
    user(where: { id: $id }) {
      posts {
        slug
        title
        snippet
        authorString
        publishDate
      }
    }
  }
`;

type Posts = {
  posts: {
    title: string;
    slug: string;
    authorString: string;
    snippet: string;
    publishDate: string;
  }[];
};

const RenderPosts = ({ posts }: Posts) => {
  return (
    <>
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
    </>
  );
};

const UserPosts: NextPage = () => {
  const { data, loading, error } = useQuery(GET_USER_POSTS, {
    variables: {
      id: authenticatedUserVar().id,
    },
  });

  if (!data || error) {
    console.log("no data");
    error ? console.log(error) : null;
  }

  return (
    <App title="Writing">
      <main className="article">
        <div className="flex-shrink-0 hidden p-4 xl:block h-2/5"> </div>
        <h2>Writing</h2>
        {data && <RenderPosts posts={data.user.posts} />}

        <Back />

        <Footer />
      </main>
    </App>
  );
};

export default UserPosts;
