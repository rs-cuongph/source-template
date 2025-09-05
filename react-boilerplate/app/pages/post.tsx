import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createPostSchema,
  type PostFormData,
} from "../utils/validation/schema";

// Mock API function to simulate post creation/update
// const submitPostToApi = async (
//   data: PostFormData
// ): Promise<{ success: boolean; errors?: any[] }> => {
//   // Simulate API delay
//   await new Promise(resolve => window.setTimeout(resolve, 1000));

//   // Simulate API validation errors
//   if (data.title.toLowerCase().includes("error")) {
//     return {
//       success: false,
//       errors: [
//         { field: "title", message: 'Title cannot contain the word "error"' },
//         {
//           field: "description",
//           message:
//             'Description must be more descriptive when title contains "error"',
//         },
//       ],
//     };
//   }

//   // Simulate public ID already exists error
//   if (data.visibility === "public" && data.publicId === "taken") {
//     return {
//       success: false,
//       errors: [
//         { field: "publicId", message: "This public ID is already taken" },
//       ],
//     };
//   }

//   return { success: true };
// };

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-sm text-red-600">
          {field.state.meta.errors.map(err => err.message).join(",")}
        </p>
      ) : null}
    </>
  );
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
      visibility: "private" as const,
      publicId: undefined,
    } as PostFormData,
    validators: {
      onSubmit: postSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("onSubmit triggered with value:", value);
      //   setIsSubmitting(true);
      //   setSubmitMessage(null);

      //   try {
      //     // Validate form data
      //     console.log("Validating with schema...");
      //     const validatedData = v.parse(postSchema, value);
      //     console.log("Validation passed:", validatedData);
      //     console.log("Form data:", JSON.stringify(validatedData));

      //     // Here you can add API call
      //     // const result = await submitPostToApi(validatedData);
      //   } catch (error) {
      //     console.log("Validation error:", error);
      //     if (error instanceof v.ValiError) {
      //       console.log("Validation issues:", error.issues);
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
      //     }
      //   } finally {
      //     setIsSubmitting(false);
      //   }
      // },
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
    },
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
          console.log("Form submit event triggered");
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="title">
          {field => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter post title"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {field => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                placeholder="Enter post description"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="visibility">
          {field => (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Visibility:
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value="private"
                    checked={field.state.value === "private"}
                    onChange={e => {
                      const value = e.target.value as "private" | "public";
                      console.log("Setting visibility to:", value);
                      field.setValue(value);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Private</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value="public"
                    checked={field.state.value === "public"}
                    onChange={e => {
                      const value = e.target.value as "private" | "public";
                      console.log("Setting visibility to:", value);
                      field.setValue(value);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Public</span>
                </label>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Debug REACTIVE */}
        <form.Subscribe selector={s => [s.values.visibility]}>
          {([_visibility]) => (
            <>
              {_visibility === "public" && (
                <form.Field name="publicId">
                  {field => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Public ID:
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter post title"
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                </form.Field>
              )}
            </>
          )}
        </form.Subscribe>

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
