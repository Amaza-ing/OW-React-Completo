import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEventHandler, SubmitEventHandler } from "react";
import type { Project } from "../types/project";
import type { AddTaskHandler, NewTask, TaskPriority } from "../types/task";

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

  const [error, setError] = useState<string | null>(null);

  const focusTitleInput = useCallback(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusTitleInput();
  }, [focusTitleInput]);

  const resetForm = useCallback(() => {
    setFormData(createInitialTask(projects));
    setError(null);
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
    const priority = event.currentTarget.value as TaskPriority;

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
        setError("Completa el título, el proyecto y la fecha.");

        focusTitleInput();
        return;
      }

      onAddTask({
        ...formData,
        title,
        dueDate,
      });

      resetForm();
    },
    [formData, focusTitleInput, onAddTask, resetForm],
  );

  return {
    formData,
    error,
    titleInputRef,
    handleTitleChange,
    handleProjectChange,
    handlePriorityChange,
    handleDueDateChange,
    handleSubmit,
    resetForm,
  };
}
