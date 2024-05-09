import { useState, useEffect, memo, useCallback } from "react";

let nextId = 0;
export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed,
  };
}
export const initialTodos = [
  createTodo("Get apples", true),
  createTodo("Get oranges", true),
  createTodo("Get carrots"),
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  console.log("renders");
  const activeTodos = todos.filter((todo) => !todo.completed);
  const footer = <footer>{activeTodos.length} todos left</footer>;
  const handleTodo = useCallback(
    (newTodo) => setTodos([...todos, newTodo]),
    []
  );

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={handleTodo} />
      <ul>
        {showActive
          ? activeTodos.map((todo) => (
              <li key={todo.id}>
                {todo.completed ? <s>{todo.text}</s> : todo.text}
              </li>
            ))
          : todos.map((todo) => (
              <li key={todo.id}>
                {todo.completed ? <s>{todo.text}</s> : todo.text}
              </li>
            ))}
      </ul>
      {footer}
    </>
  );
}

const NewTodo = memo(function NewTodo({ onAdd }) {
  console.log(" new todo render");
  const [text, setText] = useState("");
  function handleAddClick() {
    setText("");
    onAdd(createTodo(text));
  }
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
    </>
  );
});
