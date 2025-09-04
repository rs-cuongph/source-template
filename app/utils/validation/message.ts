import { useTranslation } from "react-i18next";

type TFunction = ReturnType<typeof useTranslation>["t"];

// Common validation message keys for i18n
export const VALIDATION_KEYS = {
  REQUIRED: "validation.required",
  EMAIL_INVALID: "validation.email.invalid",
  PASSWORD_MIN_LENGTH: "validation.password.minLength",
  PASSWORD_REQUIRED_CHARACTERS: "validation.password.requiredCharacters",
  CONFIRM_PASSWORD_MISMATCH: "validation.confirmPassword.mismatch",
  STRING_MIN_LENGTH: "validation.string.minLength",
  STRING_MAX_LENGTH: "validation.string.maxLength",
  PHONE_INVALID: "validation.phone.invalid",
  URL_INVALID: "validation.url.invalid",
  NUMBER_MIN: "validation.number.min",
  NUMBER_MAX: "validation.number.max",
  API_ERROR: "validation.api.error",
  NETWORK_ERROR: "validation.network.error",
} as const;

// Type for validation message keys
export type ValidationMessageKey =
  (typeof VALIDATION_KEYS)[keyof typeof VALIDATION_KEYS];

// Helper function to get validation messages with i18n
export const getValidationMessage = (
  t: TFunction,
  key: ValidationMessageKey,
  params?: Record<string, string | number>
) => {
  return t(key, params);
};

// Common validation messages factory
export const createValidationMessages = (t: TFunction) => ({
  required: (field?: string) =>
    getValidationMessage(t, VALIDATION_KEYS.REQUIRED, {
      field: field || "Field",
    }),
  emailInvalid: () => getValidationMessage(t, VALIDATION_KEYS.EMAIL_INVALID),
  passwordMinLength: (min: number) =>
    getValidationMessage(t, VALIDATION_KEYS.PASSWORD_MIN_LENGTH, { min }),
  passwordRequiredCharacters: () =>
    getValidationMessage(t, VALIDATION_KEYS.PASSWORD_REQUIRED_CHARACTERS),
  confirmPasswordMismatch: () =>
    getValidationMessage(t, VALIDATION_KEYS.CONFIRM_PASSWORD_MISMATCH),
  stringMinLength: (field: string, min: number) =>
    getValidationMessage(t, VALIDATION_KEYS.STRING_MIN_LENGTH, { field, min }),
  stringMaxLength: (field: string, max: number) =>
    getValidationMessage(t, VALIDATION_KEYS.STRING_MAX_LENGTH, { field, max }),
  phoneInvalid: () => getValidationMessage(t, VALIDATION_KEYS.PHONE_INVALID),
  urlInvalid: () => getValidationMessage(t, VALIDATION_KEYS.URL_INVALID),
  numberMin: (field: string, min: number) =>
    getValidationMessage(t, VALIDATION_KEYS.NUMBER_MIN, { field, min }),
  numberMax: (field: string, max: number) =>
    getValidationMessage(t, VALIDATION_KEYS.NUMBER_MAX, { field, max }),
  apiError: (message?: string) =>
    message || getValidationMessage(t, VALIDATION_KEYS.API_ERROR),
  networkError: () => getValidationMessage(t, VALIDATION_KEYS.NETWORK_ERROR),
});
