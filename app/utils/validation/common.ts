import type { TFunction } from "react-i18next";
import * as v from "valibot";
import { createValidationMessages } from "./message";

// Common validation patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^(\+84|0)[0-9]{9,10}$/; // Vietnamese phone number format
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Factory function to create validation schemas with i18n
export const createValidationSchemas = (t: TFunction) => {
  const messages = createValidationMessages(t);

  return {
    // String validation
    requiredString: (fieldName: string = "Field") =>
      v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1, messages.required(fieldName))
      ),

    optionalString: () => v.optional(v.string()),

    stringWithLength: (fieldName: string, min: number, max?: number) => {
      if (max) {
        return v.pipe(
          v.string(),
          v.trim(),
          v.minLength(1, messages.required(fieldName)),
          v.minLength(min, messages.stringMinLength(fieldName, min)),
          v.maxLength(max, messages.stringMaxLength(fieldName, max))
        );
      }

      return v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1, messages.required(fieldName)),
        v.minLength(min, messages.stringMinLength(fieldName, min))
      );
    },

    // Email validation
    email: () =>
      v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1, messages.required("Email")),
        v.regex(EMAIL_REGEX, messages.emailInvalid())
      ),

    // Password validation
    password: () =>
      v.pipe(
        v.string(),
        v.minLength(1, messages.required("Password")),
        v.minLength(8, messages.passwordMinLength(8)),
        v.regex(PASSWORD_REGEX, messages.passwordRequiredCharacters())
      ),

    // Phone validation
    phone: () =>
      v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1, messages.required("Phone")),
        v.regex(PHONE_REGEX, messages.phoneInvalid())
      ),

    // URL validation
    url: () =>
      v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1, messages.required("URL")),
        v.url(messages.urlInvalid())
      ),

    // Number validation
    number: (fieldName: string, min?: number, max?: number) => {
      if (min !== undefined && max !== undefined) {
        return v.pipe(
          v.number(),
          v.minValue(min, messages.numberMin(fieldName, min)),
          v.maxValue(max, messages.numberMax(fieldName, max))
        );
      }

      if (min !== undefined) {
        return v.pipe(
          v.number(),
          v.minValue(min, messages.numberMin(fieldName, min))
        );
      }

      if (max !== undefined) {
        return v.pipe(
          v.number(),
          v.maxValue(max, messages.numberMax(fieldName, max))
        );
      }

      return v.number();
    },

    // Boolean validation
    boolean: () => v.boolean(),

    // Array validation
    array: <T>(itemSchema: v.BaseSchema<T, T, v.BaseIssue<unknown>>) =>
      v.array(itemSchema),

    // Object validation
    object: <
      T extends Record<string, v.BaseSchema<any, any, v.BaseIssue<unknown>>>,
    >(
      shape: T
    ) => v.object(shape),
  };
};

// Helper function to create confirm password validation
export const createConfirmPasswordSchema = (
  t: TFunction,
  passwordValue: string
) => {
  const messages = createValidationMessages(t);

  return v.pipe(
    v.string(),
    v.minLength(1, messages.required("Confirm Password")),
    v.custom(
      value => value === passwordValue,
      messages.confirmPasswordMismatch()
    )
  );
};
