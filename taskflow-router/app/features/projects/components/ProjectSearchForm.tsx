import { Form, Link, useNavigation } from "react-router";
import "~/styles/project-search.css";

type ProjectSearchFormProps = {
  search: string;
};

function ProjectSearchForm({ search }: ProjectSearchFormProps) {
  const navigation = useNavigation();

  const isSearching = navigation.state === "loading";

  return (
    <Form className="project-search" method="get" role="search">
      <label htmlFor="project-search-input">Buscar proyectos</label>

      <div className="project-search__controls">
        <input
          id="project-search-input"
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Nombre o descripción"
        />

        <button type="submit" disabled={isSearching}>
          {isSearching ? "Buscando..." : "Buscar"}
        </button>

        {search !== "" && <Link to="/projects">Limpiar</Link>}
      </div>
    </Form>
  );
}

export default ProjectSearchForm;
