import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { NextPage, GetServerSideProps } from "next";
import client from "lib/apollo/client";
import { useDebounce } from "lib/utils";
import Link from "next/link";
import { App } from "components/template/App";

const GET_USER = gql`
  query ($id: ID) {
    user(where: { id: $id }) {
      name
      surname
      email
      bio
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $surname: String
    $bio: String
  ) {
    updateUser(
      where: { email: $email }
      data: { name: $name, surname: $surname, bio: $bio }
    ) {
      name
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);

  try {
    const { data, error } = await client.query({
      query: GET_USER,
      variables: {
        // plug the route into the query
        id: params?.id,
      },
    });
    // error -> 404 (rather than just breaking)
    if (!data || error) return { notFound: true };
    // success! return the data
    return {
      props: {
        user: data.user,
      },
    };
  } catch {
    // different kind of error? -> 404
    return { notFound: true };
  }
};

type Props = {
  user: {
    name: string;
    surname: string;
    email: string;
    bio: string;
  };
};

const EditProfile: NextPage<Props> = ({ user }: Props) => {
  const [debouncedForm, form, setForm] = useDebounce(
    {
      name: user.name,
      surname: user.surname,
      email: user.email,
      bio: user.bio,
    },
    500
  );

  type FormKeys = keyof typeof form;

  let [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  useEffect(() => {
    updateUser({
      variables: {
        name: debouncedForm.name,
        surname: debouncedForm.surname,
        email: debouncedForm.email,
        bio: debouncedForm.bio,
      },
    });
  }, [debouncedForm, updateUser]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = event.currentTarget.id as typeof event.currentTarget.id &
      FormKeys;
    const newForm = { ...form };
    newForm[targetId] = event.currentTarget.value;
    setForm(newForm);
  };

  const textAreaChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, bio: event.target.value });
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser({
      variables: {
        name: form.name,
        surname: form.surname,
        email: form.email,
        bio: form.bio,
      },
    });
  };

  return (
    <App title="Edit Profile">
      <div className="form-card">
        <h1>Edit Profile</h1>
        {!error ? (
          <form onSubmit={submitForm}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                value={form.surname}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="bio">About</label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={textAreaChangeHandler}
                // cols={25}
                rows={2}
              />
            </div>
            <div className="flex justify-center space-x-2">
              {(loading || form !== debouncedForm) && "..."}
              {data && form === debouncedForm && "saved."}
            </div>
          </form>
        ) : (
          <ErrorView message={error.message} />
        )}
      </div>
    </App>
  );
};

const ErrorView: React.FC<{ message: string }> = ({
  message,
}: {
  message: string;
}) => (
  <>
    {`error! ${message}`}{" "}
    <div className="flex justify-center space-x-2">
      <Link href="/user/new">
        <a className="px-2 bg-white rounded shadow">Create New Account</a>
      </Link>
      <Link href="/login">
        <a className="px-2 bg-white rounded shadow">Login</a>
      </Link>
    </div>
  </>
);

export default EditProfile;
