import { useState } from "react";
import api from "../api/axios";

export default function NoticeCard({ notice, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);

  const handleUpdate = async () => {
    const res = await api.put(`/notices/${notice._id}`, { title, content });
    onUpdate(res.data);
    setEditing(false);
  };

  const handleDelete = async () => {
    await api.delete(`/notices/${notice._id}`);
    onDelete(notice._id);
  };

  return (
    <div className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
      {editing ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-lg mb-2">{notice.title}</h3>
          <p>{notice.content}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
