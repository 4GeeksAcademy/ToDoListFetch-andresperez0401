import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDoList } from "./ToDoList";
import { ToDoList2 } from "./ToDoList2";

//create your first component
const Home = () => {
  return (
    <div className="principal">
      <ToDoList2 />
    </div>
  );
};

export default Home;
