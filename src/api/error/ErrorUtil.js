export const isForeignKeyViolation = (error) => error?.code === "23503";
