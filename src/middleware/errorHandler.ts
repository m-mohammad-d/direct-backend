import { Request, Response, NextFunction } from "express";

interface HttpError extends Error {
  status?: number;
}

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  if (status === 500) {
    console.log(err);

    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }

  return res.status(status).json({ status: "error", error: message });
}
