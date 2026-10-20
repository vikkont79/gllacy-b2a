interface StubProps {
  title: string
}

const Stub = ({ title }: StubProps) => {
  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className="title">{title}</h1>
      <p>Раздел в разработке.</p>
    </main>
  )
}

export { Stub }
