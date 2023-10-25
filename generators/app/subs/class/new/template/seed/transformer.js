export default async ({ item, }) => {
    const {
        name,
        code,
        capital,
        region,
        currency,
        language,
        flag,
        dialling_code
    } = item

    return {
        name,
        nameLoc: { en: name },
        code,
        capital,
        region,
        currency: currency.code,
        currencyName: currency.name,
        currencySymbol: currency.symbol,
        languageCode: language.code,
        languageName: language.name,
        flagSvgUrl: flag,
        diallingCode: dialling_code
    }
}
