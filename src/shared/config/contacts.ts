export const SITE_NAME = 'Глейси'

export const SITE_URL = 'https://gllacy-b2a.vercel.app'

export const CONTACT_PHONE = {
  raw: '+79006470352',
  display: '+7 900 647-03-52',
} as const

export const phoneHref = (raw: string): string => `tel:${raw}`

export const OPENING_HOURS = {
  opens: '10:00',
  closes: '18:00',
  days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
} as const
