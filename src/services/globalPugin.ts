// src/services/globalPlugin.ts
import { Elysia } from "elysia";

export function customValidationErrorHandler(code: any, error: any, set: any) {
  let err = error.all[0];
  if (code === "VALIDATION") {
    set.status = 400;
    return {
      status: "F",
      message: err.message,
      error: err.summary,
    };
  }
  return {
    status: "F",
    message: error.all || "An unexpected error occurred",
  };
}
