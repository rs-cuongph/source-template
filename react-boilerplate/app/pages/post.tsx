import { useForm, useStore, type AnyFieldApi } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import {
  createPostSchema,
  type PostFormData,
} from "../utils/validation/schema";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  const error = field.state.meta.errors;
  let errorMessage = "";
  if (typeof error === "string") {
    errorMessage = error;
  } else if (typeof error === "object" && error !== null) {
    errorMessage = error
      .map(err => {
        if (typeof err === "string") {
          return err;
        }
        return err.message;
      })
      .join(", ");
  }

  return (
    <>
      <p className="text-sm text-red-600">{errorMessage}</p>
    </>
  );
}

export default function PostPage() {
  const { t } = useTranslation();

  // Create validation schema with conditional validation
  const postSchema = createPostSchema(t);

  const submitPostToApi = async () => {
    // Simulate API delay
    await new Promise(resolve => window.setTimeout(resolve, 1000));
    console.log("submitPostToApi");
    // Simulate API validation errors
    return {
      form: "loi chung",
      fields: {
        title: 'Title cannot contain the word "error"',
        description:
          'Description must be more descriptive when title contains "error"',
      },
    };
  };

  const form = useForm({
    // canSubmitWhenInvalid: true,
    defaultValues: {
      title: "",
      description: "",
      visibility: "private" as const,
      publicId: "",
    } as PostFormData,
    validators: {
      onSubmit: postSchema,
      onSubmitAsync: submitPostToApi,
    },
  });

  const errors = useStore(form.store, s => s.errorMap);
  console.log("errors", errors);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("post.create")}</h1>
      </div>

      <form
        onSubmit={async e => {
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
        <form.Subscribe selector={s => s.values.visibility}>
          {_visibility => (
            <>
              {_visibility === "public" ? (
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
                        name={field.name}
                        value={field.state.value ?? ""}
                        onChange={e => field.handleChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter post title"
                      />
                      <FieldInfo field={field} />
                    </>
                  )}
                </form.Field>
              ) : null}
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
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={isSubmitting || !canSubmit}
                className={`px-6 py-2 rounded-md text-white transition-colors ${
                  isSubmitting || !canSubmit
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? t("form.loading") : t("form.submit")}
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
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
