import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as v from "valibot";
import {
  convertApiErrorsToFieldErrors,
  createCustomValidationSchemas,
  type ApiError,
} from "../utils/validation";

// Mock API function to simulate post creation/update
const submitPostToApi = async (
  data: any
): Promise<{ success: boolean; errors?: ApiError[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate API validation errors
  if (data.title.toLowerCase().includes("error")) {
    return {
      success: false,
      errors: [
        { field: "title", message: 'Title cannot contain the word "error"' },
        {
          field: "content",
          message:
            'Content must be more descriptive when title contains "error"',
        },
      ],
    };
  }

  return { success: true };
};

interface PostFormData {
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  published?: boolean;
}

export default function PostPage() {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Create validation schema
  const validationSchemas = createCustomValidationSchemas(t);
  const postSchema = validationSchemas.post();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      tags: [] as string[],
      published: false,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitMessage(null);

      try {
        // Validate form data only on submit
        const validatedData = v.parse(postSchema, value);

        // Submit to API
        const result = await submitPostToApi(validatedData);

        if (result.success) {
          setSubmitMessage({
            type: "success",
            message: t("post.createSuccess"),
          });
          // Reset form on success
          form.reset();
        } else if (result.errors) {
          // Set API errors to form fields
          const fieldErrors = convertApiErrorsToFieldErrors(result.errors);
          Object.entries(fieldErrors).forEach(([field, message]) => {
            form.setFieldMeta(field as keyof PostFormData, prev => ({
              ...prev,
              errors: [message],
            }));
          });
        }
      } catch (error) {
        if (error instanceof v.ValiError) {
          // Handle validation errors
          error.issues.forEach(issue => {
            const fieldPath = issue.path?.[0]?.key as keyof PostFormData;
            if (fieldPath) {
              form.setFieldMeta(fieldPath, prev => ({
                ...prev,
                errors: [issue.message],
              }));
            }
          });
        } else {
          setSubmitMessage({
            type: "error",
            message: t("form.error"),
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("post.create")}</h1>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {i18n.language === "en" ? "Tiếng Việt" : "English"}
        </button>
      </div>

      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {submitMessage.message}
        </div>
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Title Field */}
        <form.Field
          name="title"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("post.title")} *
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder={t("post.title")}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Content Field */}
        <form.Field
          name="content"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("post.content")} *
              </label>
              <textarea
                id={field.name}
                name={field.name}
                rows={8}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder={t("post.content")}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Summary Field */}
        <form.Field
          name="summary"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("post.summary")}
              </label>
              <textarea
                id={field.name}
                name={field.name}
                rows={3}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder={t("post.summary")}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Tags Field */}
        <form.Field
          name="tags"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("post.tags")}
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value.join(", ")}
                onBlur={field.handleBlur}
                onChange={e => {
                  const tags = e.target.value
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag);
                  field.handleChange(tags);
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="tag1, tag2, tag3"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas
              </p>
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Published Checkbox */}
        <form.Field
          name="published"
          children={field => (
            <div className="flex items-center">
              <input
                id={field.name}
                name={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={e => field.handleChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={field.name}
                className="ml-2 block text-sm text-gray-700"
              >
                {t("post.published")}
              </label>
            </div>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => form.reset()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t("form.cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md text-white transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? t("form.loading") : t("form.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
