import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Plus, Save, Trash2, Edit2, X } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
const CrudNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
  });
  const [EditingID, setEditingID] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const createNote = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      // Check if title and content are empty.
      alert("Please fill in all fields.");
    }
    const newNote = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]); // Set note at the top of the list.
    setFormData({ title: "", content: "", category: "General" }); // Reset Form
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteNote = (id: number) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id)); //Filter out the note with the given ID.
    }
  };

  const updateNote = (id: number) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill all fields.");
    }
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            title: formData.title,
            content: formData.content,
            category: formData.category,
            updatedAt: new Date().toLocaleDateString(),
          };
        } else {
          return note;
        }
      })
    );
    setEditingID(null);
    setFormData({ title: "", content: "", category: "General" }); // Reset Form
  };

  const startEdit = (note: Note) => {
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
    });
    setEditingID(note.id);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingID(null);
    setFormData({ title: "", content: "", category: "General" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📝 CRUD Notes Manager
        </h1>
        <p className="text-gray-600">
          Complete Create, Read, Update, Delete operations
        </p>
      </div>

      {/* CRUD Operations Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-green-800">CREATE</h3>
          <p className="text-sm text-green-600">Add new notes</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-800">READ</h3>
          <p className="text-sm text-blue-600">View & search notes</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-semibold text-yellow-800">UPDATE</h3>
          <p className="text-sm text-yellow-600">Edit existing notes</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h3 className="font-semibold text-red-800">DELETE</h3>
          <p className="text-sm text-red-600">Remove notes</p>
        </div>
      </div>

      {/* Form Section - CREATE/UPDATE */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {EditingID ? "✏️ Edit Note" : "➕ Create New Note"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter note title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write your note content here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {EditingID ? (
            <>
              <button
                onClick={() => updateNote(EditingID)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {/* <Save size={16} /> */}
                Update Note
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {/* <X size={16} /> */}
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={createNote}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {/* <Plus size={16} /> */}
              Create Note
            </button>
          )}
        </div>
      </div>

      {/* Search Section - READ */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🔍 Search Notes
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, content, or category..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notes Display - READ */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            📋 Your Notes ({filteredNotes.length})
          </h2>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {notes.length === 0 ? (
              <div>
                <p className="text-lg mb-2">No notes yet!</p>
                <p>Create your first note above to get started.</p>
              </div>
            ) : (
              <div>
                <p className="text-lg mb-2">No notes match your search.</p>
                <p>Try a different search term.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {note.title}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(note)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit note"
                    >
                      {/* <Edit2 size={16} /> */}
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete note"
                    >
                      {/* <Trash2 size={16} /> */}
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {note.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {note.content}
                </p>

                <div className="text-xs text-gray-500 flex justify-between">
                  <span>Created: {note.createdAt}</span>
                  {note.updatedAt !== note.createdAt && (
                    <span>Updated: {note.updatedAt}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CrudNotes;
