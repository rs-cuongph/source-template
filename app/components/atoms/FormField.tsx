interface FormFieldProps {
  field: any;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "checkbox"
    | "email"
    | "password"
    | "tags"
    | "radio";
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export function FormField({
  field,
  label,
  type = "text",
  placeholder,
  rows = 3,
  required = false,
  className = "",
  helperText,
  options = [],
}: FormFieldProps) {
  const baseInputClasses = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    field.state.meta.errors.length > 0
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300"
  } ${className}`;

  if (type === "checkbox") {
    return (
      <div className="flex items-center">
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          checked={Boolean(field.state.value)}
          onChange={e => field.handleChange(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor={field.name}
          className="ml-2 block text-sm text-gray-700"
        >
          {label}
        </label>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && "*"}
        </label>
        <textarea
          id={field.name}
          name={field.name}
          rows={rows}
          value={String(field.state.value || "")}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
          className={`${baseInputClasses} resize-vertical`}
          placeholder={placeholder}
        />
        {helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {field.state.meta.errors.length > 0 && (
          <p className="mt-1 text-sm text-red-600">
            {field.state.meta.errors[0]}
          </p>
        )}
      </div>
    );
  }

  if (type === "tags") {
    return (
      <div>
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && "*"}
        </label>
        <input
          id={field.name}
          name={field.name}
          value={
            Array.isArray(field.state.value) ? field.state.value.join(", ") : ""
          }
          onBlur={field.handleBlur}
          onChange={e => {
            const tags = e.target.value
              .split(",")
              .map(tag => tag.trim())
              .filter(tag => tag);
            field.handleChange(tags);
          }}
          className={baseInputClasses}
          placeholder={placeholder}
        />
        {helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {field.state.meta.errors.length > 0 && (
          <p className="mt-1 text-sm text-red-600">
            {field.state.meta.errors[0]}
          </p>
        )}
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && "*"}
        </label>
        <div className="space-y-2">
          {options.map(option => (
            <div key={option.value} className="flex items-center">
              <input
                id={`${field.name}-${option.value}`}
                name={field.name}
                type="radio"
                value={option.value}
                checked={field.state.value === option.value}
                onChange={e => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor={`${field.name}-${option.value}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {helperText && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {field.state.meta.errors.length > 0 && (
          <p className="mt-1 text-sm text-red-600">
            {field.state.meta.errors[0]}
          </p>
        )}
      </div>
    );
  }

  // Default text input
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={type}
        value={String(field.state.value || "")}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        className={baseInputClasses}
        placeholder={placeholder}
      />
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      {field.state.meta.errors.length > 0 && (
        <p className="mt-1 text-sm text-red-600">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  );
}

export default FormField;
