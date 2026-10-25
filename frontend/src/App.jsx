import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: ""
  });

  // Lấy danh sách sách
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");

      const data = await response.json();

      setBooks(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Xử lý nhập dữ liệu
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Thêm sách
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title: form.title,
          author: form.author,
          price: Number(form.price)
        })
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sách");
      }

      const newBook = await response.json();

      setBooks([...books, newBook]);

      setForm({
        title: "",
        author: "",
        price: ""
      });

      alert("Thêm sách thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm sách thất bại!");
    }
  };

  return (
    <div className="container">
      <h1>📚 BOOK STORE</h1>

      <div className="form-box">
        <h2>Thêm sách mới</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Tên sách"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Tên tác giả"
            value={form.author}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Giá tiền"
            value={form.price}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Thêm sách
          </button>
        </form>
      </div>

      <div className="book-list">
        <h2>Danh sách sách</h2>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Giá</th>
              <th>Xuất bản</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>
                  {book.price.toLocaleString("vi-VN")} VNĐ
                </td>

                <td>
                  {book.isPublished ? "Có" : "Không"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;