import { useState } from "react";

export default function HackLab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accessibility, setAccessibility] = useState("");
  return (
    <div className="flex justify-center p-20">
      <div className="flex-1 w-full max-w-sm p-4 border">
        <h1>sign up to the hacklab</h1>
        <form
          onSubmit={async e => {
            e.preventDefault();
            console.log("submitting");
            await fetch("/api/PostMatrixMessage", {
              method: "POST",
              body: JSON.stringify({
                message: `New signup! \n \n name: ${name} \n email: ${email} \n accessibility: ${accessibility}`,
              }),
            });
          }}
          className="flex flex-col">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="accessibility">accessibility requirements</label>
          <input
            type="text"
            id="accessibility"
            value={accessibility}
            onChange={e => setAccessibility(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

//form with fields for name, email, accessibility requirements, and a submit button

//on submit, send a message to the matrix room #hacklab:matrix.org

//the message should be a json object with the following fields:
//name: string
//email: string
//accessibility: string
//timestamp: string
//ip: string
