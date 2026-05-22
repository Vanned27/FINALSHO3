import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "https://vandiaz.pythonanywhere.com/api/tasks/";

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false,
      }),
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Management System</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <button onClick={addTask} style={styles.button}>
            Add
          </button>
        </div>

        <div>
          {tasks.length === 0 ? (
            <p style={styles.empty}>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} style={styles.task}>
                {task.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    fontFamily: "Arial",
  },

  card: {
    width: "400px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    padding: "10px 18px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

  task: {
    background: "#f1f1f1",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    color: "#333",
  },

  empty: {
    textAlign: "center",
    color: "gray",
  },
};

export default App;