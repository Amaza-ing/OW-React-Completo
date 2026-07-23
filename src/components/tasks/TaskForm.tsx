import type { Project } from "../../types/project";
import type { AddTaskHandler } from "../../types/task";
import { useTaskForm } from "../../hooks/useTaskForm";
import "./TaskForm.css";

type TaskFormProps = {
  projects: Project[];
  onAddTask: AddTaskHandler;
};

function TaskForm({ projects, onAddTask }: TaskFormProps) {
  const {
    formData,
    error,
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
