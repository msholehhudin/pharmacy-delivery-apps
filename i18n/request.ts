import {getRequestConfig} from "next-intl/server"
import { notFound } from "next/navigation"

export default getRequestConfig (async ({locale}) => {
    if(!locale || !["id", "en"].includes(locale)){
        notFound();
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    }
})