import { KeystoneContext } from "@keystone-6/core/types";
import { users } from "./users";
import { posts } from "./posts";

type UserProps = {
  name: string;
  email: string;
  password: string;
  surname: string | null;
  bio: string | null;
  website: string | null;
  pronouns: string | null;
  postcode: string | null;
};

type PostProps = {
  title: string;
  content: { type: string; children: { text: string }[] }[];
  status: string;
  publishDate: string;
  author?: { connect: { id: string }[] };
};

export async function insertSeedData(context: KeystoneContext) {
  console.log(`🌱 Inserting seed data`);

  const createUser = async (userData: UserProps) => {
    let user = null;
    try {
      user = await context.query.User.findOne({
        where: { email: userData.email },
        query: "id",
      });
    } catch (e) {}
    if (!user) {
      user = await context.query.User.createOne({
        data: userData,
        query: "id",
      });
    }
    return user;
  };

  const createPost = async (
    postData: PostProps,
    users: readonly { id: string }[],
    length: number
  ) => {
    postData.author = { connect: [users[Math.floor(Math.random() * length)]] };
    const post = await context.query.Post.createOne({
      data: postData,
      query: "id",
    });
    return post;
  };

  for (const user of users) {
    console.log(`👩 Adding user: ${user.name} ${user.surname}`);
    await createUser(user);
  }

  const userIds = await context.query.User.findMany({
    query: "id",
  });

  const newUserIds: { id: string }[] = userIds.map((user) => {
    return { id: user.id };
  });

  for (const post of posts) {
    console.log(`📝 Adding post: ${post.title}`);
    await createPost(post, newUserIds, newUserIds.length);
  }

  console.log(`✅ Seed data inserted`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
