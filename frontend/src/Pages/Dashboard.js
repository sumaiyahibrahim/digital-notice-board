import { useState, useEffect } from "react";
import api from "../api/axios";
import NoticeCard from "../components/NoticeCard";

export default function Dashboard() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotices = async () => {
    const res = await api.get("/notices");
    setNotices(res.data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAdd = async e => {
    e.preventDefault();
    const res = await api.post("/notices", { title, content });
    setNotices([res.data, ...notices]);
    setTitle(""); setContent("");
  };

  const handleUpdate = updatedNotice => {
    setNotices(notices.map(n => (n._id === updatedNotice._id ? updatedNotice : n)));
  };

  const handleDelete = id => {
    setNotices(notices.filter(n => n._id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <form onSubmit={handleAdd} className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Notice
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.map(notice => (
          <NoticeCard
            key={notice._id}
            notice={notice}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
