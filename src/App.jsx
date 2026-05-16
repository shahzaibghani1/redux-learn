import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addTodo,
  deleteTodo,
  updateTodo,
} from "./features/todoSlice";

function App() {
  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState(null);

  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editingId) {
      dispatch(
        updateTodo({
          id: editingId,
          text: input,
        })
      );

      setEditingId(null);
    } else {
      dispatch(addTodo(input));
    }

    setInput("");
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditingId(todo.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Redux Toolkit Todo App
        </h1>

        {/* Input Section */}

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}

        <div className="space-y-4">

          {todos.length === 0 && (
            <p className="text-center text-gray-500">
              No todos yet
            </p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <p className="text-lg">{todo.text}</p>

              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-400 px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App;