import { Alert } from "bootstrap";
import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

export function ToDoList2() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //Esta funcion se dispara cuando ocurre el evento de presionar enter.
  //Hara las validaciones y modificará el estado de input
  const enterPresionado = (event) => {
    //Si el evento capturado es un enter
    if (event.key === "Enter") {
      const valor = event.target.value.trim();

      //Valida si el valor de entrada es vacío
      if (valor === "") {
        alert("El campo no puede estar vacío!");
      } else {
        setTasks([...tasks, valor]); // Agrega la tarea al arreglo
      }
      event.target.value = ""; // Limpia el input
    }
  };

  const deleteAction = (posicion) => {
    // Creamos una copia del arreglo y removemos la tarea por índice
    const newTasks = [...tasks];

    //Elimine desde la posicion index, cantidad de elementos = 1;
    newTasks.splice(posicion, 1);
    setTasks(newTasks);
  };

  return (
    <div className="mainDiv">
      <h1>ToDo List</h1>
      <div className="card main-card" id="divListaTareas">
        <input
          type="text"
          id="input"
          placeholder="Add a task"
          onKeyDown={enterPresionado}
        />
        <ul>
          {tasks.map((task, index) => {
            return (
              <li key={index}>
                {task}
                <button onClick={() => deleteAction(index)}>
                  <i
                    className="fa-solid fa-xmark"
                    style={{ color: "gray" }}
                    onMouseOver={(e) => (e.target.style.color = "red")}
                    onMouseOut={(e) => (e.target.style.color = "gray")}
                  ></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer pieDeCarta">{tasks.length} task left.</div>
    </div>
  );
}
