import React, { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useDebounce } from "lib/utils";
import Link from "next/link";
import { App } from "components/template/App";
import { authenticatedUserVar } from "lib/apollo/cache";
import { GET_USER_PROFILE, UPDATE_USER } from "lib/apollo/queries";
import { FiEdit3, FiCheck, FiMoreHorizontal } from "react-icons/fi";

const EditProfile: NextPage = () => {
  let {
    data: initialData,
    loading: initialLoading,
    error: initialError,
  } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: authenticatedUserVar().id,
    },
  });

  const [debouncedForm, form, setForm] = useDebounce(
    {
      name: "",
      surname: "",
      email: "",
      bio: "",
    },
    500
  );

  useEffect(() => {
    if (initialData) setForm(initialData.user);
  }, [initialData, setForm]);

  let [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  //whenever debouncedForm changes (i.e. 500ms after user stops typing) send update mutation
  useEffect(() => {
    if (debouncedForm?.email) {
      updateUser({
        variables: {
          name: debouncedForm.name,
          surname: debouncedForm.surname,
          email: debouncedForm.email,
          bio: debouncedForm.bio,
        },
      });
    }
  }, [debouncedForm, updateUser]);

  type FormKeys = keyof typeof form;
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

  if (initialError) return <>failed to fetch initial data</>;
  if (initialLoading) return <>loading initial data...</>;

  return (
    <App title="Edit Profile">
      <div className="form-card">
        <h1>Edit Profile</h1>
        {!error ? (
          <form>
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
              {form !== debouncedForm ? (
                <FiEdit3 />
              ) : loading ? (
                <FiMoreHorizontal />
              ) : (
                data && <FiCheck />
              )}

              <Link href="/user/posts">
                <a className="button">My Posts</a>
              </Link>
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
