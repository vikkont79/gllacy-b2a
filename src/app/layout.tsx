import type { Metadata } from 'next'
import { inter } from '@/shared/lib/fonts'
import { SITE_NAME, SITE_URL } from '@/shared/config'
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/shared/config'
import { JsonLd } from '@/shared/ui'
import { Layout } from '@/widgets/layout'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'Магазин мороженого собственного производства под заказ.',
}

const organization = buildOrganizationJsonLd()
const website = buildWebSiteJsonLd()

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Layout>{children}</Layout>
        <JsonLd data={organization} />
        <JsonLd data={website} />
      </body>
    </html>
  )
}