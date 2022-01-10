import type { NextPage } from "next";
import Link from "next/link";
import { Footer } from "components/Footer";
import { App } from "components/template/App";
import { Back } from "components/Back";
import { useQuery } from "@apollo/client";
import { authenticatedUserVar } from "lib/apollo/cache";
import dayjs from "dayjs";
import { GET_USER_POSTS } from "lib/apollo/queries";

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
          <div
            key={post.slug}
            className="flex p-4 border border-black border-dashed dark:border-gray-300"
          >
            <div className="flex flex-col">
              <Link href={"/post/" + post.slug}>
                <a className="a-unstyled">
                  <h2 className="text-xl">{post.title}</h2>
                </a>
              </Link>
              <p className="text-muted">{post.snippet}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="flex flex-col items-end">
                <p className="text-sm text-muted">
                  {dayjs(post.publishDate).format("DD/MM/YYYY")}
                </p>
                <p className="text-muted author-line">
                  <em>{post.authorString}</em>
                </p>
              </div>
              <Link href={`/post/${post.slug}/edit`}>
                <a className="button">Edit</a>
              </Link>
            </div>
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
      <main className="max-w-xl form-card">
        <h1 className="mb-4 font-bold texl-3xl">My Posts</h1>
        {data && <RenderPosts posts={data.user.posts} />}

        <Back />
      </main>
      <Footer />
    </App>
  );
};

export default UserPosts;
