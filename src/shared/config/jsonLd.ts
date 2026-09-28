import { env } from '@/shared/lib/env'
import { CONTACT_PHONE, OPENING_HOURS } from './contacts'

export type BreadcrumbItem = {
  name: string
  url: string
}

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
  const { SITE_URL } = env

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Глейси',
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

export const buildBreadcrumbListJsonLd = (items: readonly BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(index === items.length - 1 ? {} : { item: item.url }),
    })),
  }
}