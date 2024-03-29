import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [title, setTitle] = useState("");

  const [books, setBooks] = useState<any>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title) {
      const ref = await addDoc(collection(db, "library"), {
        title,
      });
      setBooks([...books, { id: ref.id, title }]);
    }
  };

  useEffect(() => {
    async function getData() {
      let bookArr: any = [];
      const snap = await getDocs(collection(db, "library"));
      snap.forEach((book:any) => {
        bookArr.push({ id: book.id });
        console.log(book.title);
      });
      setBooks(bookArr);
    }

    getData();
  }, []);

  return (
    <>
      <h1>hi</h1>
      {/* <SignUp/> */}
      <h1>Add book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="book title"
        />
        <br />
        <br />
        <button>add</button>
      </form>
      <ul>
        {books.map((book: any) => {
          return <li key={book.id}>{book.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
