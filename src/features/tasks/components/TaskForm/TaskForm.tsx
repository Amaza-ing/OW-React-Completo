import type { Project } from "../../../projects/model/project";
import { useTaskForm } from "../../hooks/useTaskForm";
import { taskPriorityOptions, type AddTaskHandler } from "../../model/task";
import "./TaskForm.css";

type TaskFormProps = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

function TaskForm({ projects, onAddTask }: TaskFormProps) {
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

  return (
    <form
      className="task-form"
      action={submitAction}
      aria-busy={isPending}
      noValidate
    >
      <div className="task-form__grid">
        <label className="task-form__field">
          <span>Título</span>

          <input
            ref={titleInputRef}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Ej. Preparar presentación"
            autoComplete="off"
            disabled={isPending}
            required
          />
        </label>

        <label className="task-form__field">
          <span>Proyecto</span>

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleProjectChange}
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

        <label className="task-form__field">
          <span>Prioridad</span>

          <select
            name="priority"
            value={formData.priority}
            onChange={handlePriorityChange}
            disabled={isPending}
          >
            {taskPriorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            disabled={isPending}
            required
          />
        </label>
      </div>

      {feedback.type !== "idle" && (
        <p
          className={`task-form__feedback task-form__feedback--${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      <div className="task-form__footer">
        <p>Las nuevas tareas se crearán con estado pendiente.</p>

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
            type="submit"
            name="intent"
            value="submit"
            disabled={projects.length === 0 || isPending}
          >
            {isPending ? "Procesando..." : "Añadir tarea"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
