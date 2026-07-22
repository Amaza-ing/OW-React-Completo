import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Project } from "../../types/project";
import type { AddTaskHandler, NewTask, TaskPriority } from "../../types/task";
import "./TaskForm.css";

type TaskFormProps = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

const emptyTask: NewTask = {
  title: "",
  projectId: "",
  priority: "medium",
  dueDate: "",
};

function TaskForm({ projects, onAddTask }: TaskFormProps) {
  const [formData, setFormData] = useState<NewTask>({
    ...emptyTask,
    projectId: projects[0]?.id ?? "",
  });

  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      title,
    }));
  }

  function handleProjectChange(event: ChangeEvent<HTMLSelectElement>) {
    const projectId = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      projectId,
    }));
  }

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    const priority = event.currentTarget.value as TaskPriority;

    setFormData((currentForm) => ({
      ...currentForm,
      priority,
    }));
  }

  function handleDueDateChange(event: ChangeEvent<HTMLInputElement>) {
    const dueDate = event.currentTarget.value;

    setFormData((currentForm) => ({
      ...currentForm,
      dueDate,
    }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = formData.title.trim();
    const dueDate = formData.dueDate.trim();

    if (title === "" || formData.projectId === "" || dueDate === "") {
      setError("Completa el título, el proyecto y la fecha.");
      return;
    }

    onAddTask({
      ...formData,
      title,
      dueDate,
    });

    setFormData({
      ...emptyTask,
      projectId: projects[0]?.id ?? "",
    });

    setError(null);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__grid">
        <label className="task-form__field">
          <span>Título</span>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Ej. Preparar presentación"
            autoComplete="off"
            required
          />
        </label>

        <label className="task-form__field">
          <span>Proyecto</span>

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleProjectChange}
            required
          >
            {projects.length === 0 && (
              <option value="">No hay proyectos disponibles</option>
            )}

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <label className="task-form__field">
          <span>Prioridad</span>

          <select
            name="priority"
            value={formData.priority}
            onChange={handlePriorityChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>

        <label className="task-form__field">
          <span>Fecha o plazo</span>

          <input
            type="text"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleDueDateChange}
            placeholder="Ej. Viernes"
            autoComplete="off"
            required
          />
        </label>
      </div>

      {error !== null && (
        <p className="task-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="task-form__footer">
        <p>Las nuevas tareas se crearán con estado pendiente.</p>

        <button type="submit" disabled={projects.length === 0}>
          Añadir tarea
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
