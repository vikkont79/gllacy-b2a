type JsonLdProps = {
  data: unknown
}

const JsonLd = ({ data }: Readonly<JsonLdProps>) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(data).replace(/</g, '\\u003c')}
    </script>
  )
}

export { JsonLd }