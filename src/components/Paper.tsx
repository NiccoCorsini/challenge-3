import { useSelector } from "react-redux";
import { Store } from "../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Task from "./Task";
import Actions from "./Actions";
import { useEffect, useMemo, useState } from "react";
import "../style/Paper.css";

const Paper = () => {
  const { tasks } = useSelector((state: Store) => state.tasks);

  const [isNothingToDoAnimated, setIsNothingToDoAnimated] = useState(false);

  const memoTasks = useMemo(() => {
    return tasks.map((task) => task);
  }, [tasks]);

  useEffect(() => {
    setTimeout(() => {
      setIsNothingToDoAnimated(Boolean(memoTasks.length));
    }, 400);
  }, [memoTasks]);

  return (
    <div className="flex-column dead-center paper-wrapper">
      <h2 style={{ fontSize: 23 }} className="m8">
        <FontAwesomeIcon style={{ marginRight: 4 }} icon={faPen} /> ToDo ·
        Challenge 3
      </h2>
      <div
        className={
          "tasks-wrapper " + (!isNothingToDoAnimated ? "dead-center " : "")
        }
      >
        {isNothingToDoAnimated ? (
          memoTasks.map((task, i) => (
            <Task key={task.id} currentTask={task} indexNo={i + 1} />
          ))
        ) : (
          <h3
            className={
              memoTasks.length
                ? "animate__animated animate__backOutLeft"
                : "animate__animated animate__backInLeft"
            }
          >
            There is nothing to do...
          </h3>
        )}
      </div>
      <Actions areTasksHere={Boolean(memoTasks.length)} />
    </div>
  );
};

export default Paper;
