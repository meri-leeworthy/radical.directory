import React, { useEffect } from "react";
// import { gql, useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useDebounce } from "lib/utils";
import Link from "next/link";
import { App } from "components/template/App";
// import { authenticatedUserVar } from "lib/apollo/cache";
// import { GET_USER_PROFILE, UPDATE_USER } from "lib/apollo/queries";
import { AutosaveIndicator } from "components/AutosaveIndicator";
import AutoTextArea from "components/AutoTextArea";

const EditProfile: NextPage = () => {
  //Placeholder code so the page renders
  const error = false;
  const loading = false;
  const initialError = false;
  const initialLoading = false;
  const data = true;

  // let {
  //   data: initialData,
  //   loading: initialLoading,
  //   error: initialError,
  // } = useQuery(GET_USER_PROFILE, {
  //   variables: {
  //     id: authenticatedUserVar().id,
  //   },
  // });

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
    let initialData = {
      user: {
        name: "Meri",
        surname: "Leeworthy",
        email: "em@i.l",
        bio: "This form doesn't actually save to a server. It did once, but the server was running for months for no reason and it got too expensive. It says 'saved', but it's a lie.",
      },
    };

    if (initialData && form.email === "") {
      setForm(initialData.user);
    }
  }, [form.email, setForm]);

  // let [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  //whenever debouncedForm changes (i.e. 500ms after user stops typing) send update mutation
  // useEffect(() => {
  //   if (debouncedForm?.email) {
  //     updateUser({
  //       variables: {
  //         name: debouncedForm.name,
  //         surname: debouncedForm.surname,
  //         email: debouncedForm.email,
  //         bio: debouncedForm.bio,
  //       },
  //     });
  //   }
  // }, [debouncedForm]);

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
        <div className="flex items-center justify-between w-full">
          <div> </div>
          <h1>Edit Profile</h1>
          <AutosaveIndicator
            editing={form !== debouncedForm}
            loading={!!loading}
            saved={!!data}
          />
        </div>
        {!error ? (
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={changeHandler}
            />

            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              value={form.surname}
              onChange={changeHandler}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={changeHandler}
            />

            <label htmlFor="bio">About</label>
            <AutoTextArea
              id="bio"
              value={form.bio}
              onChange={textAreaChangeHandler}
            />

            <div className="flex justify-end w-full mt-4 space-x-2">
              <Link href="/user/posts">
                <a className="button">My Posts</a>
              </Link>
            </div>
          </form>
        ) : (
          <ErrorView message={"error.message"} />
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
