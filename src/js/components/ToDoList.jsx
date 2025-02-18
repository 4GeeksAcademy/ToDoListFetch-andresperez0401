import { Alert } from "bootstrap";
import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

export function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //Esta funcion se dispara cuando ocurre el evento de presionar enter.
  //Hara las validaciones y modificará el estado de input
  const enterPresionado = (event) => {
    //Si el evento capturado es un enter
    if (event.key === "Enter") {
      const valor = event.target.value;

      //Valida si el valor de entrada es vacío
      if (valor === "") {
        alert("El campo no puede estar vacío!");
      } else {
        setInput(valor.trim());
      }
      event.target.value = ""; // Limpia el input
    }
  };

  useEffect(() => {
    //Es importante colocar el trim, porque por el renderizado de react pueden venir campos vacíos y agregarse.

    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  }, [input]);

  useEffect(() => {
    //Creamos el elemento UL de la lista.
    let lista = document.createElement("ul");
    let divListaTareas = document.getElementById("divListaTareas");

    const children = Array.from(divListaTareas.children);
    // Si un hijo no es INPUT, lo quitamos
    children.forEach((child) => {
      if (child.tagName !== "INPUT") {
        divListaTareas.removeChild(child);
      }
    });

    //Iteramos sobre el arreglo de tareas para ir agregandolas
    tasks.forEach((element, index) => {
      //Creamos el elemento LI
      let li = document.createElement("li");
      li.textContent = element;

      // Botón para eliminar la tarea
      const deleteBtn = document.createElement("button");
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-xmark");

      // Estilo inicial en gris
      icon.style.color = "gray";

      // Cambia a rojo cuando pasas el mouse
      deleteBtn.addEventListener("mouseover", () => {
        icon.style.color = "red";
      });
      deleteBtn.addEventListener("mouseout", () => {
        icon.style.color = "gray";
      });

      // Agregar el ícono al botón
      deleteBtn.appendChild(icon);

      // Al hacer clic, quitamos la tarea del estado
      deleteBtn.addEventListener("click", () => {
        // Creamos una copia del arreglo y removemos la tarea por índice
        const newTasks = [...tasks];

        //Elimine desde la posicion index, cantidad de elementos = 1;
        newTasks.splice(index, 1);
        setTasks(newTasks);
      });

      // Insertamos el botón en el LI
      li.appendChild(deleteBtn);
      // Insertamos el LI en la UL
      lista.appendChild(li);
    });

    //Agregamos la lista al div
    divListaTareas.appendChild(lista);
  }, [tasks]);

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
      </div>
      <div className="card-footer pieDeCarta">{tasks.length} task left.</div>
    </div>
  );
}
