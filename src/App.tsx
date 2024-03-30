import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const [books, setBooks] = useState<any>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title && year) {
      setLoading(true);
      const ref = await addDoc(collection(db, "library"), {
        title,
        year,
      });
      setBooks([...books, { id: ref.id, title, year }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      let bookArr: any = [];
      const snap = await getDocs(collection(db, "library"));
      snap.forEach((book: any) => {
        bookArr.push({ id: book.id, ...book.data() });
        console.log(book.data());
      });
      setBooks(bookArr);
    }
    getData();
  }, []);

  return (
    <>
      <h1>hi</h1>
      <SignUp />
      <h1>Add book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="book title"
        />
        <input
          type="number"
          value={year}
          required
          onChange={(e) => setYear(e.target.value)}
          placeholder="book year"
        />
        <br />
        <br />
        <button disabled={loading}>{loading?"uploading...":"add"}</button>
      </form>
      <ul>
        {loading ? (
          <img src="/loading.svg" alt="loading..." width={50} height={50} />
        ) : (
          ""
        )}
        {books.map((book) => {
          return (
            <li key={book.id}>
              Title: {book.title}
              <br />
              year: {book.year ? book.year : "hasn't year"}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
