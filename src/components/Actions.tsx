import { useDispatch } from "react-redux";
import Button from "./Button";
import { addTask, resetTodo } from "../store/actions/tasks";
import { generateUniqueId } from "../helpers/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type ActionsProps = {
  areTasksHere: boolean;
};

const Actions = ({ areTasksHere }: ActionsProps) => {
  const dispatch = useDispatch();

  const [isExitAnimated, setIsExitAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsExitAnimated(areTasksHere);
    }, 400);
  }, [areTasksHere]);

  return (
    <div className="dead-center">
      <Button
        icon={<FontAwesomeIcon icon={faPlus} />}
        title="Add"
        onClick={() =>
          dispatch(
            addTask({
              id: generateUniqueId(),
              description: "",
            })
          )
        }
      />
      {isExitAnimated ? (
        <Button
          otherClasses={
            (isExitAnimated ? "animate__animated animate__fadeInRight" : "") +
            (!areTasksHere ? "animate__animated animate__fadeOutRight" : "")
          }
          icon={<FontAwesomeIcon icon={faTrash} />}
          title="Clear all!"
          isRed
          onClick={() => dispatch(resetTodo())}
        />
      ) : null}
    </div>
  );
};

export default Actions;
