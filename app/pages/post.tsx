import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as v from "valibot";
import FormField from "../components/atoms/FormField";
import { createPostSchema } from "../utils/validation/schema";

// Mock API function to simulate post creation/update
const submitPostToApi = async (
  data: PostFormData
): Promise<{ success: boolean; errors?: any[] }> => {
  // Simulate API delay
  await new Promise(resolve => window.setTimeout(resolve, 1000));

  // Simulate API validation errors
  if (data.title.toLowerCase().includes("error")) {
    return {
      success: false,
      errors: [
        { field: "title", message: 'Title cannot contain the word "error"' },
        {
          field: "description",
          message:
            'Description must be more descriptive when title contains "error"',
        },
      ],
    };
  }

  // Simulate public ID already exists error
  if (data.visibility === "public" && data.publicId === "taken") {
    return {
      success: false,
      errors: [
        { field: "publicId", message: "This public ID is already taken" },
      ],
    };
  }

  return { success: true };
};

interface PostFormData {
  title: string;
  description: string;
  visibility: "private" | "public";
  publicId: string;
}

export default function PostPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Create validation schema with conditional validation
  const postSchema = createPostSchema(t);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      visibility: "private" as "private" | "public",
      publicId: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = v.safeParse(postSchema, value);
        return result.success ? undefined : result.issues;
      },
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitMessage(null);
      console.log(JSON.stringify(value));
      setIsSubmitting(false);
    },
    // onSubmit: async ({ value }) => {
    //   console.log("onSubmit triggered with value:", value);
    //   setIsSubmitting(true);
    //   setSubmitMessage(null);

    //   try {
    //     // Validate form data only on submit
    //     console.log("Validating with schema...");
    //     const validatedData = v.parse(postSchema, value);
    //     console.log("Validation passed:", validatedData);
    //     alert(JSON.stringify(validatedData));
    //     // Submit to API
    //     const result = await submitPostToApi(validatedData);

    //     if (result.success) {
    //       setSubmitMessage({
    //         type: "success",
    //         message: t("post.createSuccess"),
    //       });
    //       // Reset form on success
    //       form.reset();
    //     } else if (result.errors) {
    //       // Set API errors to form fields
    //       const fieldErrors = convertApiErrorsToFieldErrors(result.errors);
    //       Object.entries(fieldErrors).forEach(([field, message]) => {
    //         form.setFieldMeta(field as keyof PostFormData, prev => ({
    //           ...prev,
    //           errors: [message],
    //         }));
    //       });
    //     }
    //   } catch (error) {
    //     if (error instanceof v.ValiError) {
    //       // Handle validation errors
    //       error.issues.forEach(issue => {
    //         const fieldPath = issue.path?.[0]?.key as keyof PostFormData;
    //         if (fieldPath) {
    //           form.setFieldMeta(fieldPath, prev => ({
    //             ...prev,
    //             errors: [issue.message],
    //           }));
    //         }
    //       });
    //     } else {
    //       setSubmitMessage({
    //         type: "error",
    //         message: t("form.error"),
    //       });
    //     }
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // },
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("post.create")}</h1>
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
        <form.Field name="title">
          {field => (
            <FormField
              field={field}
              label={t("post.title")}
              placeholder={t("post.title")}
              required
            />
          )}
        </form.Field>

        {/* Description Field */}
        <form.Field name="description">
          {field => (
            <FormField
              field={field}
              label={t("post.description")}
              type="textarea"
              placeholder={t("post.description")}
              rows={5}
              required
            />
          )}
        </form.Field>

        {/* Visibility Radio */}
        <form.Field name="visibility">
          {field => (
            <FormField
              field={field}
              label={t("post.visibility")}
              type="radio"
              required
              options={[
                { value: "private", label: t("post.private") },
                { value: "public", label: t("post.public") },
              ]}
            />
          )}
        </form.Field>

        {/* Public ID Field - Only show when visibility is public */}
        {form.state.values.visibility === "public" && (
          <form.Field name="publicId">
            {field => (
              <FormField
                field={field}
                label={t("post.publicId")}
                placeholder="my-awesome-post"
                required
                helperText="Only letters, numbers, hyphens and underscores allowed"
              />
            )}
          </form.Field>
        )}

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
