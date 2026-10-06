import type { Metadata } from 'next'
import { inter } from '@/shared/lib/fonts'
import { env } from '@/shared/lib/env'
import { SITE_NAME } from '@/shared/config'
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/shared/config/jsonLd'
import { JsonLd } from '@/shared/ui'
import { Layout } from '@/widgets/layout'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
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