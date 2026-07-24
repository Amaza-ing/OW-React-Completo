import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ChangeEventHandler } from "react";
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

type TaskFormAction = (
  previousFeedback: TaskFormFeedback,
  formData: FormData,
) => Promise<TaskFormFeedback>;

const emptyTask: NewTask = {
  title: "",
  projectId: "",
  priority: "medium",
  dueDate: "",
};

const initialFeedback: TaskFormFeedback = {
  type: "idle",
};

function createInitialTask(projects: Project[]): NewTask {
  return {
    ...emptyTask,
    projectId: projects[0]?.id ?? "",
  };
}

function getTextField(formData: FormData, fieldName: string): string {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function useTaskForm({ projects, onAddTask }: UseTaskFormOptions) {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<NewTask>(() =>
    createInitialTask(projects),
  );

  const focusTitleInput = useCallback(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    focusTitleInput();
  }, [focusTitleInput]);

  const resetFields = useCallback(() => {
    setFormData(createInitialTask(projects));

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

  const taskFormAction = useCallback<TaskFormAction>(
    async (_previousFeedback, submittedData) => {
      const intent = getTextField(submittedData, "intent");

      if (intent === "reset") {
        resetFields();
        return initialFeedback;
      }

      const title = getTextField(submittedData, "title");

      const projectId = getTextField(submittedData, "projectId");

      const priority = getTextField(submittedData, "priority");

      const dueDate = getTextField(submittedData, "dueDate");

      if (
        title === "" ||
        projectId === "" ||
        dueDate === "" ||
        !isTaskPriority(priority)
      ) {
        focusTitleInput();

        return {
          type: "error",
          message: "Completa el título, el proyecto y la fecha.",
        };
      }

      await wait(700);

      onAddTask({
        title,
        projectId,
        priority,
        dueDate,
      });

      resetFields();

      return {
        type: "success",
        message: "Tarea añadida correctamente.",
      };
    },
    [focusTitleInput, onAddTask, resetFields],
  );

  const [feedback, submitAction, isPending] = useActionState(
    taskFormAction,
    initialFeedback,
  );

  return {
    formData,
    feedback,
    isPending,
    titleInputRef,
    handleTitleChange,
    handleProjectChange,
    handlePriorityChange,
    handleDueDateChange,
    submitAction,
  };
}
