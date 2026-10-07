/* Разметка сайта для поисковых агентов. */

import { CONTACT_PHONE, OPENING_HOURS, SITE_NAME, SITE_URL } from './contacts'



const DAY_OF_WEEK: Record<(typeof OPENING_HOURS.days)[number], string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
}

export const buildOrganizationJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
    telephone: CONTACT_PHONE.raw,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: OPENING_HOURS.days.map((day) => DAY_OF_WEEK[day]),
        opens: OPENING_HOURS.opens,
        closes: OPENING_HOURS.closes,
      },
    ],
  }
}

export const buildWebSiteJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}

