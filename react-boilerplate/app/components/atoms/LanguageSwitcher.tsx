import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "button" | "dropdown";
}

export function LanguageSwitcher({
  className = "",
  variant = "button",
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const languages = ["en", "ja"];
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex]);
  };

  if (variant === "dropdown") {
    return (
      <select
        value={i18n.language}
        onChange={e => i18n.changeLanguage(e.target.value)}
        className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="en">{t("common.english")}</option>
        <option value="ja">{t("common.japanese")}</option>
      </select>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      title={t("common.language")}
    >
      {i18n.language === "en" ? t("common.japanese") : t("common.english")}
    </button>
  );
}

export default LanguageSwitcher;
