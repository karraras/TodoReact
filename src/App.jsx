import { useReducer, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

function App() {
  const [idE, setId] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "input":
        return [...state, { name: action.name, id: new Date().getTime() }];
      case "delete":
        return state.filter((item) => item.id != action.id);
      case "edit":
        return state.map((item) => {
          if (action.id === item.id) {
            ref.current.value = item.name;
          }
          return item;
        });

      case "reWrite":
        return state.map((item) => {
          if (action.id === item.id) {
            item.name = action.name;
          }
          return item;
        });

      default:
        return state;
    }
  };

  const initial = [];
  const ref = useRef("");
  const [edit, setEdit] = useState(false);
  const [state, dispatch] = useReducer(reducer, initial);

  const handleClick = () => {
    if (edit) {
      dispatch({
        type: "reWrite",
        id: idE,
        name: ref.current.value,
      });
      setEdit(false);
      ref.current.value = "";
    } else if (ref.current.value !== "") {
      dispatch({ type: "input", name: ref.current.value });
      ref.current.value = "";
    }
    ref.current.focus();
  };

  const handleDelete = (id) => {
    dispatch({ type: "delete", id: id });
  };

  const handleEdit = (id) => {
    dispatch({ type: "edit", id: id });
    setEdit(true);
    setId(id);
  };

  return (
    <main className="h-screen w-full bg-black flex items-center justify-center">
      <div className="bg-white rounded overflow-hidden w-[400px] p-2  outline-none focus:border-none">
        <div className="grid grid-cols-7 ">
          <input
            ref={ref}
            className="col-span-5 focus:outline-none "
            type="text"
            placeholder="inter you task "
            name="username"
          />
          <button
            onClick={handleClick}
            className="text-white col-start-7 bg-green-600 rounded"
          >
            {edit ? "Edit" : "Add"}
          </button>
        </div>
        <div className="py-2">
          {state.map((item) => {
            return (
              <div key={item.id} className="grid grid-cols-7">
                <p className="col-span-4">{item.name}</p>
                <div className="col-start-7 grid grid-cols-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-green-600 cursor-pointer col-span-1"
                  >
                    <MdModeEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 cursor-pointer col-start-2"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
