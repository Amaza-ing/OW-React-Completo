import { Form, useNavigation } from "react-router";
import type { Project } from "~/features/projects/model/project";
import "~/styles/project-member-form.css";

export type MemberFormFeedback = {
  status: "success" | "error";
  message: string;
};

type QuickMemberFormProps = {
  projects: Project[];
  feedback?: MemberFormFeedback;
};

function QuickMemberForm({ projects, feedback }: QuickMemberFormProps) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="member-form-panel">
      <header>
        <div>
          <span>Action de la ruta</span>
          <h2>Añadir integrante rápido</h2>
        </div>

        <p>Elige un proyecto y envía la mutación sin crear estado duplicado.</p>
      </header>

      <Form className="member-form" method="post">
        <label>
          Proyecto
          <select name="projectId" required>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Nombre
          <input name="name" type="text" placeholder="Lucía Torres" required />
        </label>

        <label>
          Rol
          <input name="role" type="text" placeholder="Frontend" required />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Añadiendo..." : "Añadir integrante"}
        </button>
      </Form>

      {feedback !== undefined && (
        <p
          className={`member-form-panel__feedback member-form-panel__feedback--${feedback.status}`}
          role="status"
        >
          {feedback.message}
        </p>
      )}
    </section>
  );
}

export default QuickMemberForm;
