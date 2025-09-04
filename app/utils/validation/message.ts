import type { TFunction } from "react-i18next";

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

// Default English messages (fallback)
export const defaultValidationMessages = {
  [VALIDATION_KEYS.REQUIRED]: "{{field}} is required",
  [VALIDATION_KEYS.EMAIL_INVALID]: "Please enter a valid email address",
  [VALIDATION_KEYS.PASSWORD_MIN_LENGTH]:
    "Password must be at least {{min}} characters long",
  [VALIDATION_KEYS.PASSWORD_REQUIRED_CHARACTERS]:
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  [VALIDATION_KEYS.CONFIRM_PASSWORD_MISMATCH]: "Passwords do not match",
  [VALIDATION_KEYS.STRING_MIN_LENGTH]:
    "{{field}} must be at least {{min}} characters long",
  [VALIDATION_KEYS.STRING_MAX_LENGTH]:
    "{{field}} must not exceed {{max}} characters",
  [VALIDATION_KEYS.PHONE_INVALID]: "Please enter a valid phone number",
  [VALIDATION_KEYS.URL_INVALID]: "Please enter a valid URL",
  [VALIDATION_KEYS.NUMBER_MIN]: "{{field}} must be at least {{min}}",
  [VALIDATION_KEYS.NUMBER_MAX]: "{{field}} must not exceed {{max}}",
  [VALIDATION_KEYS.API_ERROR]:
    "An error occurred while processing your request",
  [VALIDATION_KEYS.NETWORK_ERROR]:
    "Network error. Please check your connection and try again",
};

// Vietnamese messages
export const vietnameseValidationMessages = {
  [VALIDATION_KEYS.REQUIRED]: "{{field}} là bắt buộc",
  [VALIDATION_KEYS.EMAIL_INVALID]: "Vui lòng nhập địa chỉ email hợp lệ",
  [VALIDATION_KEYS.PASSWORD_MIN_LENGTH]:
    "Mật khẩu phải có ít nhất {{min}} ký tự",
  [VALIDATION_KEYS.PASSWORD_REQUIRED_CHARACTERS]:
    "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số",
  [VALIDATION_KEYS.CONFIRM_PASSWORD_MISMATCH]: "Mật khẩu không khớp",
  [VALIDATION_KEYS.STRING_MIN_LENGTH]:
    "{{field}} phải có ít nhất {{min}} ký tự",
  [VALIDATION_KEYS.STRING_MAX_LENGTH]:
    "{{field}} không được vượt quá {{max}} ký tự",
  [VALIDATION_KEYS.PHONE_INVALID]: "Vui lòng nhập số điện thoại hợp lệ",
  [VALIDATION_KEYS.URL_INVALID]: "Vui lòng nhập URL hợp lệ",
  [VALIDATION_KEYS.NUMBER_MIN]: "{{field}} phải ít nhất {{min}}",
  [VALIDATION_KEYS.NUMBER_MAX]: "{{field}} không được vượt quá {{max}}",
  [VALIDATION_KEYS.API_ERROR]: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn",
  [VALIDATION_KEYS.NETWORK_ERROR]:
    "Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại",
};
