import { notFound } from 'next/navigation'

import { getProduct } from '@/entities/product/api/getProduct'
import styles from './ProductPage.module.css'

interface ProductPageProps {
  readonly slug: string
}

const ProductPage = async ({ slug }: ProductPageProps) => {
  const product = await getProduct(slug)

  if (!product) notFound()

  const {
    name,
    slug: currentSlug,
    base,
    flavour,
    price,
    calories,
    shelfLife,
    description,
    isAvailable,
    isNew,
    createdAt,
    toppings,
  } = product

  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className={styles.name}>{name}</h1>
      <dl className={styles.list}>
        <dt>slug</dt>
        <dd>{currentSlug}</dd>

        <dt>base</dt>
        <dd>{base}</dd>

        <dt>flavour</dt>
        <dd>{flavour}</dd>

        <dt>price</dt>
        <dd>{price / 100} ₽/кг</dd>

        <dt>calories</dt>
        <dd>{calories} ккал/100 г</dd>

        <dt>shelfLife</dt>
        <dd>{shelfLife} сут</dd>

        <dt>isAvailable</dt>
        <dd>{String(isAvailable)}</dd>

        <dt>isNew</dt>
        <dd>{String(isNew)}</dd>

        <dt>createdAt</dt>
        <dd>{createdAt.toISOString()}</dd>

        <dt>description</dt>
        <dd>{description}</dd>

        <dt>toppings</dt>
        <dd>
          {toppings.length === 0
            ? 'нет наполнителей'
            : toppings.map((topping) => `${topping.name} (${topping.kind})`).join(', ')}
        </dd>
      </dl>
    </main>
  )
}

export { ProductPage }