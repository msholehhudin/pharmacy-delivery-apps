import { useTranslations } from "next-intl";

const PharmacyHeader = () => {
  const t = useTranslations("Transactions");
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {t("pageTitle")}
      </h1>
      <p className="text-gray-600 dark:text-slate-400 mt-2">
        {t("description")}
      </p>
    </div>
  );
};

export default PharmacyHeader;
