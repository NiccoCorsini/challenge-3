import { useEffect, useState } from "react";
import { Task as TaskType } from "../definitions/types";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../store/actions/tasks";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import en from "date-fns/locale/en-GB";
import CountdownTimer from "./CountdownTimer";
import "../style/Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import Button from "./Button";
import { faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import "animate.css";

registerLocale("en", en);

type TaskProps = {
  currentTask: TaskType;
  indexNo: number;
};

const Task = ({ currentTask, indexNo }: TaskProps) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());

  const [boolManagement, setBoolManagement] = useState({
    isDeletion: false,
    isDataPickerOpen: false,
    isAnimationInitialized: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setBoolManagement((boolManagement) => ({
        ...boolManagement,
        isAnimationInitialized: true,
      }));
    }, 800);
  }, []);

  useEffect(() => {
    if (currentTask.dueDate) {
      setStartDate(new Date(currentTask.dueDate));
    }
  }, [currentTask]);

  const debouncedDescription = debounce((input: string) => {
    dispatch(
      updateTask({ ...currentTask, id: currentTask.id, description: input })
    );
  }, 600);

  const debouncedDeletion = debounce(() => {
    dispatch(removeTask({ id: currentTask.id }));
  }, 600);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedDescription(e.target.value);
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTask({
        ...currentTask,
        id: currentTask.id,
        [e.target.name]: e.target.checked,
      })
    );
  };

  return (
    <div
      className={
        "m8 " +
        (boolManagement.isDeletion
          ? "animate__animated animate__backOutLeft"
          : !boolManagement.isAnimationInitialized
          ? "animate__animated animate__bounceInDown"
          : "")
      }
    >
      <div className="align-center">
        <h4 className="m-ho8">{indexNo}</h4>
        <input
          className={
            "task-input" +
            (currentTask.isCompleted
              ? " animate__animated animate__shakeY"
              : "")
          }
          placeholder="New task..."
          type="text"
          name="description"
          id="description"
          defaultValue={currentTask.description}
          style={
            currentTask.isCompleted ? { textDecoration: "line-through" } : {}
          }
          onChange={handleDescriptionChange}
        />

        <label className="custom-checkbox m-ho8">
          <input
            className="hide"
            type="checkbox"
            name="isCompleted"
            id="isCompleted"
            defaultChecked={currentTask.isCompleted}
            onChange={handleCompletedChange}
          />
          {currentTask.isCompleted ? (
            <FontAwesomeIcon color="#3da9fc" icon={faCircleCheck} />
          ) : (
            <FontAwesomeIcon color="#ef4565" icon={faCircleXmark} />
          )}
          <span style={{ marginLeft: 4 }}>Done</span>
        </label>

        <Button
          isRed
          icon={<FontAwesomeIcon icon={faTrash} />}
          title="Delete"
          onClick={() => {
            setBoolManagement({ ...boolManagement, isDeletion: true });
            debouncedDeletion();
          }}
        />
      </div>
      <div className="align-center date-picker-wrapper">
        <FontAwesomeIcon
          onClick={() =>
            setBoolManagement({ ...boolManagement, isDataPickerOpen: true })
          }
          className="date-picker-icon"
          icon={faCalendarDays}
        />
        <div style={{ position: "relative" }}>
          <DatePicker
            open={boolManagement.isDataPickerOpen}
            onClickOutside={() =>
              setBoolManagement({ ...boolManagement, isDataPickerOpen: false })
            }
            onInputClick={() =>
              setBoolManagement({ ...boolManagement, isDataPickerOpen: true })
            }
            customInput={
              currentTask.dueDate ? (
                <input className="date-picker-input animate__animated animate__fadeIn" />
              ) : (
                <label className="date-picker-label animate__animated animate__fadeIn">
                  Expiration date?
                </label>
              )
            }
            selected={startDate}
            onChange={(date: Date) => {
              dispatch(updateTask({ ...currentTask, dueDate: date }));
            }}
            locale="en"
            showTimeSelect
            dateFormat="Pp"
          />
          {currentTask.dueDate ? (
            <CountdownTimer expirationDate={currentTask.dueDate} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Task;
