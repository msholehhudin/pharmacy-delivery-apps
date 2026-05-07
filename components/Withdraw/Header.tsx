"use client";

import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("WithdrawAdmin");
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {t("title")}
      </h1>
      <p className="text-gray-600 dark:text-slate-400 mt-2">
        {t("description")}
      </p>
    </>
  );
};

export default Header;
