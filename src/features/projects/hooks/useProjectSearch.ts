import type { ChangeEventHandler } from "react";
import { useSearchParams } from "react-router";
import type { Project } from "../model/project";

type SearchChangeHandler = ChangeEventHandler<HTMLInputElement>;

export function useProjectSearch(projects: Project[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects =
    normalizedSearch === ""
      ? projects
      : projects.filter((project) =>
          project.name.toLowerCase().includes(normalizedSearch),
        );

  const handleSearchChange: SearchChangeHandler = (event) => {
    const value = event.currentTarget.value;

    if (value === "") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      search: value,
    });
  };

  return {
    search,
    filteredProjects,
    handleSearchChange,
  };
}
