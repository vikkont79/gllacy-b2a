import { describe, expect, it, vi } from 'vitest'
import { env } from '@/shared/lib/env'
import { CONTACT_PHONE, OPENING_HOURS, SITE_NAME } from './contacts'
import { buildBreadcrumbListJsonLd, buildOrganizationJsonLd, buildWebSiteJsonLd } from './jsonLd'

vi.mock('@/shared/lib/env', () => ({
  env: { SITE_URL: 'https://gllacy-b2a.vercel.app' },
}))

const crumbs = [
  { name: 'Главная', url: '/' },
  { name: 'Каталог', url: '/products' },
  { name: 'Пломбир', url: '/products?base=plombir' },
] as const

describe('buildOrganizationJsonLd', () => {
  const organization = buildOrganizationJsonLd()

  it('Organization с контекстом', () => {
    expect(organization['@context']).toBe('https://schema.org')
    expect(organization['@type']).toBe('Organization')
  })
  it('url совпадает с SITE_URL', () => {
    expect(organization.url).toBe(env.SITE_URL)
  })
  it('name берётся из конфига, а не литерала', () => {
    expect(organization.name).toBe(SITE_NAME)
  })
  it('logo построен от SITE_URL', () => {
    expect(organization.logo).toEqual({
      '@type': 'ImageObject',
      url: `${env.SITE_URL}/logo.svg`,
    })
  })
  it('телефон совпадает с контактом', () => {
    expect(organization.telephone).toBe(CONTACT_PHONE.raw)
  })
  it('часы: семь дней полными именами, время из конфига', () => {
    expect(organization.openingHoursSpecification[0].dayOfWeek).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ])
    expect(organization.openingHoursSpecification[0].opens).toBe(OPENING_HOURS.opens)
    expect(organization.openingHoursSpecification[0].closes).toBe(OPENING_HOURS.closes)
  })
})

describe('buildWebSiteJsonLd', () => {
  const website = buildWebSiteJsonLd()

  it('WebSite с контекстом', () => {
    expect(website['@context']).toBe('https://schema.org')
    expect(website['@type']).toBe('WebSite')
  })
  it('url совпадает с SITE_URL', () => {
    expect(website.url).toBe(env.SITE_URL)
  })
  it('name берётся из конфига, а не литерала', () => {
    expect(website.name).toBe(SITE_NAME)
  })
})

describe('buildBreadcrumbListJsonLd', () => {
  it('позиции по порядку, последний элемент без item', () => {
    const breadcrumb = buildBreadcrumbListJsonLd(crumbs)

    expect(breadcrumb['@type']).toBe('BreadcrumbList')
    expect(breadcrumb.itemListElement).toHaveLength(3)
    expect(breadcrumb.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: '/',
    })
    expect(breadcrumb.itemListElement[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Каталог',
      item: '/products',
    })
    expect(breadcrumb.itemListElement[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Пломбир',
    })
  })
})