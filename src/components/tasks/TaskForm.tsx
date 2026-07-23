import { useTaskForm } from "../../hooks/useTaskForm";
import type { Project } from "../../types/project";
import { taskPriorities, type AddTaskHandler } from "../../types/task";
import { getTaskPriorityLabel } from "../../utils/taskUtils";
import "./TaskForm.css";

type TaskFormProps = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

function TaskForm({ projects, onAddTask }: TaskFormProps) {
  const {
    formData,
    feedback,
    titleInputRef,
    handleTitleChange,
    handleProjectChange,
    handlePriorityChange,
    handleDueDateChange,
    handleSubmit,
    resetForm,
  } = useTaskForm({
    projects,
    onAddTask,
  });

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
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
            {taskPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {getTaskPriorityLabel(priority)}
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
            type="button"
            onClick={resetForm}
          >
            Limpiar
          </button>

          <button type="submit" disabled={projects.length === 0}>
            Añadir tarea
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
