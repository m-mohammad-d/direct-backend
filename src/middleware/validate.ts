import { HttpError } from "@/utils/HttpError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType } from "zod";

export function validateBody<T>(schema: ZodType<T>): RequestHandler {
  return (req: Request<{}, {}, T>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new HttpError(400, "Invalid request body"));
    }

    req.body = result.data;
    next();
  };
}
