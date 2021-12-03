import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN } from "lib/apollo/queries";
import { App } from "components/template/App";
import { authenticatedUser } from "lib/apollo/cache";

const Login: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
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

  let [login, { data, loading, error }] = useMutation(LOGIN);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    login({
      variables: {
        email: form.email,
        password: form.password,
      },
    });
  };
  if (data?.authenticateUserWithPassword.item) {
    authenticatedUser({
      name: data.authenticateUserWithPassword.item.name,
      id: data.authenticateUserWithPassword.item.id,
    });
    // router.push(`/user/${data.authenticateUserWithPassword.item.id}`);
    router.push("/user/edit");
  }

  if (error) return <>{`submission error! ${error.message}`}</>;
  if (data?.authenticateUserWithPassword.message)
    return (
      <>{`email or password were incorrect. ${data.authenticateUserWithPassword.message}`}</>
    );

  return (
    <App title="Login">
      <div className="form-card">
        <h1 className="hidden">Login</h1>
        <form onSubmit={submitForm}>
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
            <button type="submit" className="px-2 bg-white rounded shadow">
              Login
            </button>
            <Link href="/newuser">
              <a className="px-2 bg-white rounded shadow">New Account</a>
            </Link>
          </div>
          {loading && "submitting..."}
        </form>
      </div>
    </App>
  );
};

export default Login;
