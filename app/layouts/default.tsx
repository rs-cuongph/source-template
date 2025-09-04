import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import LanguageSwitcher from "../components/atoms/LanguageSwitcher";

export default function DefaultLayout() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                {t("layout.title")}
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/post"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t("nav.posts")}
              </Link>
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher variant="dropdown" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>{t("layout.description")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
