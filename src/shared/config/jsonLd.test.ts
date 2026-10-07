import { describe, expect, it } from 'vitest'
import { CONTACT_PHONE, OPENING_HOURS, SITE_NAME, SITE_URL } from './contacts'
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from './jsonLd'

describe('buildOrganizationJsonLd', () => {
  const organization = buildOrganizationJsonLd()

  it('Organization с контекстом', () => {
    expect(organization['@context']).toBe('https://schema.org')
    expect(organization['@type']).toBe('Organization')
  })
  it('url совпадает с SITE_URL', () => {
    expect(organization.url).toBe(SITE_URL)
  })
  it('name берётся из конфига, а не литерала', () => {
    expect(organization.name).toBe(SITE_NAME)
  })
  it('logo построен от SITE_URL', () => {
    expect(organization.logo).toEqual({
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
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
    expect(website.url).toBe(SITE_URL)
  })
  it('name берётся из конфига, а не литерала', () => {
    expect(website.name).toBe(SITE_NAME)
  })
})

