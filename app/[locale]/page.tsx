// // app/[locale]/page.tsx
// import { useTranslations } from "next-intl";

// export default function HomePage() {
//   const t = useTranslations("Home");

//   return (
//     <main>
//       <h1>{t("title")}</h1>
//       <p>{t("description")}</p>
//     </main>
//   );
// }

// app/[locale]/page.tsx (temporary)
export default function Page({ params }: { params: { locale: string } }) {
  return <h1>Hello from Root Page!</h1>;
}
