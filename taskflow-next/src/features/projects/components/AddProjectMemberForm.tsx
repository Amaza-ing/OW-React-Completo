"use client";

import { useActionState } from "react";
import {
  addProjectMemberAction,
  type AddMemberActionState,
} from "../actions/addProjectMemberAction";

type AddProjectMemberFormProps = {
  projectId: string;
};

const initialState: AddMemberActionState = {
  status: "idle",
  message: "",
};

export default function AddProjectMemberForm({
  projectId,
}: AddProjectMemberFormProps) {
  const [state, formAction, isPending] = useActionState(
    addProjectMemberAction,
    initialState,
  );

  return (
    <form className="add-member-form" action={formAction}>
      <input type="hidden" name="projectId" value={projectId} />

      <div className="add-member-form__fields">
        <label>
          Nombre
          <input type="text" name="name" disabled={isPending} required />
        </label>
        <label>
          Rol
          <input type="text" name="role" disabled={isPending} required />
        </label>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Añadiendo..." : "Añadir al equipo"}
      </button>

      {state.message !== "" && (
        <p
          className={`add-member-form__message add-member-form__message--${state.status}`}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
