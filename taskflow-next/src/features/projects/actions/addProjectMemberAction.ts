"use server";

import { revalidatePath } from "next/cache";
import { addProjectMember } from "../api/projectsGraphql";

export type AddMemberActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function addProjectMemberAction(
  _previousState: AddMemberActionState,
  formData: FormData,
): Promise<AddMemberActionState> {
  const projectId = formData.get("projectId");
  const name = formData.get("name");
  const role = formData.get("role");

  if (
    typeof projectId !== "string" ||
    typeof name !== "string" ||
    typeof role !== "string"
  ) {
    return { status: "error", message: "No se han recibido todos los campos." };
  }

  const cleanName = name.trim();
  const cleanRole = role.trim();

  if (cleanName === "" || cleanRole === "") {
    return { status: "error", message: "El nombre y el rol son obligatorios." };
  }

  try {
    await addProjectMember({ projectId, name: cleanName, role: cleanRole });
    revalidatePath(`/projects/${projectId}`);
    return {
      status: "success",
      message: `${cleanName} se ha añadido al equipo.`,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "No se ha podido añadir.",
    };
  }
}
