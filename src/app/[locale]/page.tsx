import HomeContainer from "@/components/containers/HomeContainer";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export default async function Home({ params: { locale } }: any) {
  const { t, resources } = await initTranslations(locale, ["common"]);

  return (
    <div className="h-screen flex flex-col items-center">
      <TranslationsProvider
        namespaces={["common"]}
        locale={locale}
        resources={resources}
      >
        <HomeContainer />
      </TranslationsProvider>
    </div>
  );
}
