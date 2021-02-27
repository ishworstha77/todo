import * as React from "react";

const App = () => {
  const [task, settask] = React.useState(
    JSON.parse(window.localStorage.getItem("task")) || []
  );
  const [inputValue, setInputValue] = React.useState("");
  const [edit, setEdit] = React.useState({ index: null, prev: "" });

  React.useEffect(() => {
    window.localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  React.useEffect(() => {
    if (edit.index > -1) {
      const edited = window.prompt("Edit your data", edit.prev);
      const _temp = [...task];
      _temp[edit.index] = edited;
      settask(_temp);
      setEdit({ inde: null, prev: "" });
    }
  }, [edit.index]);
  return (
    <div>
      <input
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            const _temp = [...task];
            _temp.push(e.currentTarget.value);
            settask(_temp);
            setInputValue("");
          }
        }}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        value={inputValue}
      />
      {task.map((t, i) => (
        <div key={i}>
          <p>
            Task {i + 1}: {t}{" "}
            <button
              onClick={() => {
                setEdit({ index: i, prev: t });
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                const _temp = [...task];
                _temp.splice(i, 1);
                settask(_temp);
              }}
            >
              delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
export default App;
