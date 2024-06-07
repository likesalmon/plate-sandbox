export interface InvariantError extends Error {
  stack: string;
  message: string;
}

