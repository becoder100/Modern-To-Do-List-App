import { useEffect, useState } from "react";

function App({ username, onLogout }) {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(`todos_${username}`);
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing todos from localStorage", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
  }, [todos, username]);

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: crypto.randomUUID(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (e, id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    onLogout();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-200 to-cyan-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-violet-600">{username}</span>
            </h1>
            <p className="text-gray-600 mt-2">Let's organize your tasks for today</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <span>Logout</span>
            <span className="text-lg">🚪</span>
          </button>
        </div>

        {/* Add Todo Section */}
        <div className="mb-8">
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={todo}
              type="text"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
              placeholder="What needs to be done?"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-violet-200"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Todos List Section */}
        <div className="space-y-4">
          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-6xl mb-4">🎉</p>
              <p className="text-xl">Your todo list is empty! Time to add some tasks.</p>
            </div>
          )}
          
          {todos.map((item) => (
            <div
              key={item.id}
              className="group flex flex-wrap items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <input
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
                name={item.id}
                className="flex-shrink-0 w-5 h-5 mt-1 rounded-md border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0 break-words">
                <p className={`text-gray-800 ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                  {item.todo}
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
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