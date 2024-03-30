import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
const SignUp = () => {
  const [data, setData] = useState<any>([]);
  const [verified, setVerified] = useState<boolean>(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = values;
    if (email == "") {
      alert("provide email");
      return;
    }
    if (password !== values.passwordConfirm) {
      alert("password should match");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((user:any) => {
        setVerified(true);
        setData(user.user);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className={`${verified ? "hidden" : ""}`}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="your email"
          />
          <br />
          <label htmlFor="pass">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            id="pass"
          />
          <br />
          <label htmlFor="pass2">Password</label>
          <input
            onChange={handleChange}
            name="passwordConfirm"
            type="password"
            id="pass"
          />
          <br />
          <button>sign up</button>
        </form>
      </div>
      <div className={`${verified?"":"hidden"}`}>
        <div>
          {data.email} <br />
          {data.emailVerified ? "verified email" : "your email not verified"}
        </div>
        <div
          onClick={() => {
            setVerified(false);
          }} style={{cursor:"pointer"}}
        >
          log out
        </div>
      </div>
    </>
  );
};

export default SignUp;
