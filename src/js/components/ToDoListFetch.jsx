import React from "react";
import { useState, useEffect } from "react";

export function ToDoListFetch() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //--------------------------------------------------------------------------------------------------------------
  //Comienza el primer useEffect()

  //Usamos el useEffect para cargar las tareas desde la API al cargar el componente.
  useEffect(() => {
    //Dentro del useEffect creamos la funcion asincrona encargada de cargar las tareas
    const fetchData = async () => {
      //Bloque try-catch para capturar los errores.
      try {
        //Realizamos el fetch a la API para obtener las tareas. El metodo por defecto es GET
        let response = await fetch(
          "https://playground.4geeks.com/todo/users/andresperez0401"
        );


        //Si la respuesta no esta bien, puede que el usuario no este creado en el servidor, eso lo validamos.
        if (!response.ok) {
          let userCreate = await createUser("andresperez0401");

          if (userCreate.ok) {
            response = await fetch(
              "https://playground.4geeks.com/todo/users/andresperez0401"
            );
          } else {
            throw new Error();
          }
        }

        let data = await response.json();

        //Actualizamos el estado de las tareas con los datos obtenidos de la API.
        setTasks(data.todos);
      } catch (error) {
        alert("Error al cargar las tareas: " + error);
      }
    };

    //Hacemos el call de la función dentro del UseEffect.
    fetchData();
  }, []);

  //Finaliza el useEffect()
  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  //Funcion para crear el usuario en el servidor

  const createUser = async (user) => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${user}`,
        {
          method: "POST",
        }
      );

      return response;
    } catch (error) {
      console.log("Error al crear el usuario" + error);
    }
  };

  //Finaliza la función para crear el usuario en el servidor
  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  //Comienza la función para agregar tareas, al presionar enter. Capturamos el evento como parámetro de la función.

  const enterPresionado = async (event) => {
    //Valida si el evento capturado es un enter
    if (event.key === "Enter") {
      // const valor = event.target.value.trim();
      const valor = input.trim();

      //Valida si el valor obtenido es vacío, si es así, lanza un alert.
      if (valor === "") {
        alert("El campo no puede estar vacío!");
      }

      //Si entra acá, es porque paso las validaciones.
      else {
        //Bloque try-catch para capturar los errores.
        try {
          //Hacemos el fecth a la API para agregar la tarea.
          let response = await fetch(
            "https://playground.4geeks.com/todo/todos/andresperez0401",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                label: valor,
                done: false,
              }),
            }
          );

          if (response.ok) {
            let data = await response.json();
            setTasks([...tasks, data]);
            alert("Tarea agregada correctamente");
          } else {
            throw new Error();
          }
        } catch (error) {
          alert("Error al agregar la tarea", error);
        }
      }
      event.target.value = ""; // Limpia el input
    }
  };

  //Finaliza la función para agregar tareas, al presionar enter.
  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  //Comienza el DeleteAction()

  //Funcion encargada de hacer el delete de una tarea.
  const deleteAction = async (tarea) => {
    //Hacemos la peticion a la API con el metodo Delete.
    fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
      method: "DELETE",
    })
      //El then para manejar el accept de la peticion.
      .then((response) => {
        //Validamos que la peticion devuelva una respuesta correcta y no un falso positivo.
        if (response.ok) {
          //Actualizamos el estado de las tareas del componente.
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== tarea.id)
          );
          alert(
            `Tarea: [ ${tarea.label} ] de id: [ ${tarea.id} ] eliminada correctamente`
          );

          //Si la respuesta de la peticion no fue Ok, lanzamos un error.
        } else {
          throw new Error();
        }
      })

      //Capturamos el error de la promesa al eliminar, y lo disparamos en un Alert.
      .catch((error) => {
        alert(
          `Tarea: [ ${tarea.label} ] de id: [ ${tarea.id} ] no ha podido ser eliminada `,
          error
        );
      });
  };

  //Finaliza el DeleteAction()
  //----------------------------------------------------------------------------------------------------------

  return (
    <div className="mainDiv">
      <h1>ToDo List</h1>
      <div className="card main-card" id="divListaTareas">
        <input
          type="text"
          id="input"
          placeholder="Add a task"
          onKeyDown={enterPresionado}
          onChange={(e) => setInput(e.target.value)}
        />
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                {task.label}
                <button onClick={() => deleteAction(task)}>
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
