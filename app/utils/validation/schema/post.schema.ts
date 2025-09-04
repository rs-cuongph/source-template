import { useTranslation } from "react-i18next";
import * as v from "valibot";
import { createValidationSchemas } from "../common";

type TFunction = ReturnType<typeof useTranslation>["t"];

/**
 * Post Schema
 * Validates post data including:
 * - Title (5-200 characters)
 * - Description (10-1000 characters)
 * - Visibility (private/public)
 * - Public ID (required only if visibility is public)
 */
export const createPostSchema = (t: TFunction) => {
  const baseSchemas = createValidationSchemas(t);

  return v.pipe(
    v.object({
      title: baseSchemas.stringWithLength("Title", 5, 200),
      description: baseSchemas.stringWithLength("Description", 10, 1000),
      visibility: v.picklist(["private", "public"]),
      publicId: v.optional(v.string()),
    })
    // v.custom(data => {
    //   // If visibility is public, publicId is required
    //   if (
    //     data.visibility === "public" &&
    //     (!data.publicId || data.publicId.trim() === "")
    //   ) {
    //     return false;
    //   }
    //   // If visibility is public, publicId must be valid format (alphanumeric + hyphens)
    //   if (data.visibility === "public" && data.publicId) {
    //     const validFormat = /^[a-zA-Z0-9-_]+$/.test(data.publicId.trim());
    //     if (!validFormat) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }, "Public ID is required and must be valid when visibility is public")
  );
};

// Type definitions
export type PostData = v.InferInput<ReturnType<typeof createPostSchema>>;
