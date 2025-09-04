import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {t("home.title")}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t("home.subtitle")}
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          {t("home.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/post"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {t("home.getStarted")}
          </Link>
          <a
            href="#features"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {t("home.learnMore")}
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold">TS</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.typescript")}
          </h3>
          <p className="text-gray-600 text-sm">
            Full TypeScript support for better development experience
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 font-bold">R7</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.router")}
          </h3>
          <p className="text-gray-600 text-sm">
            Latest React Router with file-based routing
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 font-bold">F</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.forms")}
          </h3>
          <p className="text-gray-600 text-sm">
            Powerful form handling with TanStack Form
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 font-bold">V</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.validation")}
          </h3>
          <p className="text-gray-600 text-sm">
            Schema validation with Valibot
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-600 font-bold">i18n</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.i18n")}
          </h3>
          <p className="text-gray-600 text-sm">
            Multi-language support with react-i18next
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-cyan-600 font-bold">CSS</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t("home.features.styling")}
          </h3>
          <p className="text-gray-600 text-sm">
            Modern styling with Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
