import { useId } from "react";
import type { Project } from "../../../projects/model/project";
import { useTaskForm } from "../../hooks/useTaskForm";
import { taskPriorityOptions, type AddTaskHandler } from "../../model/task";
import "./TaskForm.css";

type TaskFormProps = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

function TaskForm({ projects, onAddTask }: TaskFormProps) {
  const fieldId = useId();

  const titleId = `${fieldId}-title`;
  const projectId = `${fieldId}-project`;
  const priorityId = `${fieldId}-priority`;
  const dueDateId = `${fieldId}-due-date`;
  const feedbackId = `${fieldId}-feedback`;

  const {
    formData,
    feedback,
    isPending,
    titleInputRef,
    handleTitleChange,
    handleProjectChange,
    handlePriorityChange,
    handleDueDateChange,
    submitAction,
  } = useTaskForm({
    projects,
    onAddTask,
  });

  const feedbackDescriptionId =
    feedback.type === "idle" ? undefined : feedbackId;

  return (
    <form
      className="task-form"
      data-cy="task-form"
      action={submitAction}
      aria-busy={isPending}
      noValidate
    >
      <div className="task-form__grid">
        <label className="task-form__field" htmlFor={titleId}>
          <span>Título</span>

          <input
            ref={titleInputRef}
            id={titleId}
            data-cy="task-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            aria-describedby={feedbackDescriptionId}
            placeholder="Ej. Preparar presentación"
            autoComplete="off"
            disabled={isPending}
            required
          />
        </label>

        <label className="task-form__field" htmlFor={projectId}>
          <span>Proyecto</span>

          <select
            id={projectId}
            name="projectId"
            value={formData.projectId}
            onChange={handleProjectChange}
            aria-describedby={feedbackDescriptionId}
            disabled={isPending}
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

        <label className="task-form__field" htmlFor={priorityId}>
          <span>Prioridad</span>

          <select
            id={priorityId}
            name="priority"
            value={formData.priority}
            onChange={handlePriorityChange}
            aria-describedby={feedbackDescriptionId}
            disabled={isPending}
          >
            {taskPriorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="task-form__field" htmlFor={dueDateId}>
          <span>Fecha o plazo</span>

          <input
            id={dueDateId}
            data-cy="task-due-date"
            type="text"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleDueDateChange}
            aria-describedby={feedbackDescriptionId}
            placeholder="Ej. Viernes"
            autoComplete="off"
            disabled={isPending}
            required
          />
        </label>
      </div>

      {feedback.type !== "idle" && (
        <p
          id={feedbackId}
          className={`task-form__feedback task-form__feedback--${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      <div className="task-form__actions">
        <button
          className="task-form__reset"
          type="submit"
          name="intent"
          value="reset"
          disabled={isPending}
        >
          Limpiar
        </button>

        <button
          data-cy="task-submit"
          type="submit"
          name="intent"
          value="submit"
          disabled={projects.length === 0 || isPending}
        >
          {isPending ? "Procesando..." : "Añadir tarea"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
