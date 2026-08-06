"use server";

import { cookies } from "next/headers";

const SHOW_COMPLETED_COOKIE = "taskflow-show-completed";

export async function updateProjectVisibility(formData: FormData) {
  const showCompleted = formData.get("showCompleted") === "on";
  const cookieStore = await cookies();

  cookieStore.set(SHOW_COMPLETED_COOKIE, showCompleted ? "true" : "false", {
    path: "/",
    sameSite: "lax",
  });
}

export async function getProjectVisibility() {
  const cookieStore = await cookies();
  return cookieStore.get(SHOW_COMPLETED_COOKIE)?.value === "true";
}
