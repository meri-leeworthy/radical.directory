import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";

const NEW_USER = gql`
  mutation NewUser($name: String, $email: String, $password: String) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      name
    }
  }
`;

const NewUser: NextPage = () => {
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

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    newUser({
      variables: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
  };
  if (data) return <>Submitted!</>;
  if (error) return <>{`submission error! ${error.message}`}</>;

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="form-card">
        <h1>Create New Account</h1>
        <form onSubmit={submitForm}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={changeHandler}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={changeHandler}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={changeHandler}
            />
          </fieldset>
          <div className="flex justify-center">
            <button type="submit" className="px-2 border border-white rounded">
              Create Account
            </button>
          </div>
          {loading && "submitting..."}
        </form>
      </div>
    </div>
  );
};

export default NewUser;
