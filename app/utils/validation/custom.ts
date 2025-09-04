import type { TFunction } from "react-i18next";
import * as v from "valibot";
import { createValidationSchemas } from "./common";

// Custom validation schemas for specific use cases
export const createCustomValidationSchemas = (t: TFunction) => {
  const baseSchemas = createValidationSchemas(t);

  return {
    // User registration form
    userRegistration: () =>
      v.object({
        firstName: baseSchemas.stringWithLength("First Name", 2, 50),
        lastName: baseSchemas.stringWithLength("Last Name", 2, 50),
        email: baseSchemas.email(),
        password: baseSchemas.password(),
        phone: v.optional(baseSchemas.phone()),
        agreeToTerms: v.pipe(
          v.boolean(),
          v.custom(
            value => value === true,
            "You must agree to the terms and conditions"
          )
        ),
      }),

    // User login form
    userLogin: () =>
      v.object({
        email: baseSchemas.email(),
        password: baseSchemas.requiredString("Password"),
        rememberMe: v.optional(v.boolean()),
      }),

    // Contact form
    contact: () =>
      v.object({
        name: baseSchemas.stringWithLength("Name", 2, 100),
        email: baseSchemas.email(),
        subject: baseSchemas.stringWithLength("Subject", 5, 200),
        message: baseSchemas.stringWithLength("Message", 10, 1000),
      }),

    // Post/Article form
    post: () =>
      v.object({
        title: baseSchemas.stringWithLength("Title", 5, 200),
        content: baseSchemas.stringWithLength("Content", 50, 5000),
        summary: v.optional(baseSchemas.stringWithLength("Summary", 10, 500)),
        tags: v.optional(v.array(baseSchemas.stringWithLength("Tag", 1, 50))),
        published: v.optional(v.boolean()),
      }),

    // Profile update form
    profileUpdate: () =>
      v.object({
        firstName: baseSchemas.stringWithLength("First Name", 2, 50),
        lastName: baseSchemas.stringWithLength("Last Name", 2, 50),
        phone: v.optional(baseSchemas.phone()),
        bio: v.optional(baseSchemas.stringWithLength("Bio", 0, 1000)),
        website: v.optional(baseSchemas.url()),
      }),

    // Change password form
    changePassword: () =>
      v.object({
        currentPassword: baseSchemas.requiredString("Current Password"),
        newPassword: baseSchemas.password(),
        // confirmPassword will be added dynamically based on newPassword value
      }),
  };
};

// Helper function to create dynamic validation schema based on form data
export const createDynamicSchema = <T extends Record<string, any>>(
  t: TFunction,
  schemaFactory: (
    schemas: ReturnType<typeof createValidationSchemas>
  ) => v.ObjectSchema<any, any>,
  formData?: T
) => {
  const schemas = createValidationSchemas(t);
  return schemaFactory(schemas);
};
