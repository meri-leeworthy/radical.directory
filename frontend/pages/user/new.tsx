import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN } from "lib/apollo/queries";
import { App } from "components/template/App";
import { authenticatedUserVar } from "lib/apollo/cache";

const NEW_USER = gql`
  mutation NewUser($name: String, $email: String, $password: String) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

const NewUser: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  type FormKeys = keyof typeof form;

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const targetId = event.currentTarget.id as typeof event.currentTarget.id &
      FormKeys;
    const newForm = { ...form };
    newForm[targetId] = event.currentTarget.value;
    setForm(newForm);
  };

  let [newUser, { data, loading, error }] = useMutation(NEW_USER);
  let [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN);

  const runLogin = async () => {
    console.log("logging in");
    await login({
      variables: {
        email: form.email,
        password: form.password,
      },
    });
    console.log(loginData || loginError);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    await newUser({
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
    await runLogin();
    console.log(loginData || loginError);
  };

  console.log(`data ${!!data}, !loading ${!loading}, !loginData ${!loginData}`);

  // if (data && !loading && !loginResult.data) {
  //   runLogin();
  // }

  if (loginData) {
    console.log(loginData.authenticateUserWithPassword.item?.id);
    localStorage.setItem(
      "userId",
      loginData.authenticateUserWithPassword.item.id as string
    );
    authenticatedUserVar({
      name: loginData.authenticateUserWithPassword.item.name,
      id: loginData.authenticateUserWithPassword.item.id,
    });
    // router.push(`/user/${loginData.authenticateUserWithPassword.item.id}`);
    router.push("/user/edit");
  }

  if (error) return <>{`submission error! ${error.message}`}</>;

  return (
    <App title="Create New Account">
      <div className="form-card">
        <h1>Create New Account</h1>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={changeHandler}
            />
          </div>
          <div className="flex justify-center space-x-2">
            <button type="submit" className="button">
              Create Account
            </button>
            <Link href="/login">
              <a className="button">Login</a>
            </Link>
          </div>
          {loading && "submitting..."}
          {error && `submission error! ${error}`}
          {data && `successfully created account! redirecting...`}
        </form>
      </div>
    </App>
  );
};

export default NewUser;
