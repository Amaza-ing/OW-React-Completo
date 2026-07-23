import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEventHandler, SubmitEventHandler } from "react";
import type { Project } from "../../projects/model/project";
import {
  isTaskPriority,
  type AddTaskHandler,
  type NewTask,
  type TaskFormFeedback,
} from "../model/task";

type UseTaskFormOptions = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

type SelectChangeHandler = ChangeEventHandler<HTMLSelectElement>;

type TaskFormSubmitHandler = SubmitEventHandler<HTMLFormElement>;

const emptyTask: NewTask = {
  title: "",
  projectId: "",
  priority: "medium",
  dueDate: "",
};

function createInitialTask(projects: Project[]): NewTask {
  return {
    ...emptyTask,
    projectId: projects[0]?.id ?? "",
  };
}

export function useTaskForm({ projects, onAddTask }: UseTaskFormOptions) {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<NewTask>(() =>
    createInitialTask(projects),
  );

  const [feedback, setFeedback] = useState<TaskFormFeedback>({
    type: "idle",
  });

  const focusTitleInput = useCallback(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusTitleInput();
  }, [focusTitleInput]);

  const resetForm = useCallback(() => {
    setFormData(createInitialTask(projects));
    setFeedback({
      type: "idle",
    });
    focusTitleInput();
  }, [projects, focusTitleInput]);

  const handleTitleChange = useCallback<InputChangeHandler>((event) => {
    const title = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      title,
    }));
  }, []);

  const handleProjectChange = useCallback<SelectChangeHandler>((event) => {
    const projectId = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      projectId,
    }));
  }, []);

  const handlePriorityChange = useCallback<SelectChangeHandler>((event) => {
    const priority = event.currentTarget.value;

    if (!isTaskPriority(priority)) {
      setFeedback({
        type: "error",
        message: "La prioridad seleccionada no es válida.",
      });
      return;
    }

    setFormData((currentForm) => ({
      ...currentForm,
      priority,
    }));
  }, []);

  const handleDueDateChange = useCallback<InputChangeHandler>((event) => {
    const dueDate = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      dueDate,
    }));
  }, []);

  const handleSubmit = useCallback<TaskFormSubmitHandler>(
    (event) => {
      event.preventDefault();

      const title = formData.title.trim();
      const dueDate = formData.dueDate.trim();

      if (title === "" || formData.projectId === "" || dueDate === "") {
        setFeedback({
          type: "error",
          message: "Completa el título, el proyecto y la fecha.",
        });

        focusTitleInput();
        return;
      }

      onAddTask({
        ...formData,
        title,
        dueDate,
      });

      setFormData(createInitialTask(projects));

      setFeedback({
        type: "success",
        message: "Tarea añadida correctamente.",
      });

      focusTitleInput();
    },
    [formData, focusTitleInput, onAddTask, projects],
  );

  return {
    formData,
    feedback,
    titleInputRef,
    handleTitleChange,
    handleProjectChange,
    handlePriorityChange,
    handleDueDateChange,
    handleSubmit,
    resetForm,
  };
}
