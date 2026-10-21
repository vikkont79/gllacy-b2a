import { Fragment } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getProduct } from '@/entities/product/api/getProduct'
import { CATEGORY_LABELS } from '@/entities/product/lib'
import { IconButton, JsonLd } from '@/shared/ui'
import { Breadcrumbs, buildBreadcrumbsJsonLd } from '@/widgets/breadcrumbs'
import { buildProductJsonLd } from '../../lib/buildProductJsonLd'
import { createProductCrumbs } from '../../lib/createProductCrumbs'
import { groupProductToppings } from '../../lib/groupProductToppings'
import styles from './ProductPage.module.css'

interface ProductPageProps {
  readonly slug: string
}

const ProductPage = async ({ slug }: ProductPageProps) => {
  const product = await getProduct(slug)

  if (!product) notFound()

  const {
    name,
    description,
    image,
    base,
    price,
    calories,
    protein,
    fat,
    carbs,
    shelfLife,
    composition,
    isAvailable,
    isNew,
    toppings,
  } = product

  const jsonLd = buildProductJsonLd(product)
  const crumbs = createProductCrumbs(product)
  const breadcrumbJsonLd = buildBreadcrumbsJsonLd(crumbs)
  const toppingGroups = groupProductToppings(toppings)

  return (
    <>
      {/* Разметка вне main: агент читает документ до отрисованной страницы. */}
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main id="content" tabIndex={-1} className="wrapper">
        <Breadcrumbs className={styles.breadcrumbs} crumbs={crumbs} />
        <article className={styles.product}>
          <div className={styles.media}>
            <Image
              className={styles.image}
              src={`/${image}`}
              width={320}
              height={320}
              alt={name}
              priority
            />
          </div>

          <div className={styles.info}>
            <div className={styles.heading}>
              <h1 className={styles.name}>{name}</h1>
              <div className={styles.badges}>
                {isNew && <span className={styles.badge}>Новинка</span>}
                {!isAvailable && (
                  <span className={`${styles.badge} ${styles.badgeUnavailable}`}>
                    Нет в продаже
                  </span>
                )}
              </div>
            </div>

            <p className={styles.description}>{description}</p>

            <div className={styles.purchase}>
              <p className={styles.price}>{price / 100} ₽/кг</p>
              <IconButton
                className={styles.cart}
                icon="cart"
                iconSize={20}
                iconPosition="right"
                variant="secondary"

                disabled={!isAvailable}
              >
                Добавить в корзину
              </IconButton>
            </div>

            <dl className={styles.list}>
              <dt>Основа</dt>
              <dd>{CATEGORY_LABELS[base]}</dd>

              <dt>Наполнители</dt>
              <dd className={styles.toppings}>
                {toppingGroups.length === 0
                  ? 'нет'
                  : toppingGroups.map((group, index) => (
                      <Fragment key={group.kind}>
                        <span className={styles.toppingGroup}>
                          <span className={styles.badge}>{group.label}</span>
                          {group.names.length > 0 && (
                            <span className={styles.toppingNames}>
                              {group.names.map((name) => (
                                <span key={name}>{name}</span>
                              ))}
                            </span>
                          )}
                        </span>
                        {index < toppingGroups.length - 1 && ', '}
                      </Fragment>
                    ))}
              </dd>

              <dt>Срок хранения</dt>
              <dd>{shelfLife} сут</dd>

              <dt>Пищевая ценность</dt>
              <dd>на 100 г</dd>
            </dl>

            <dl className={styles.list}>
              <dt>Калорийность</dt>
              <dd>{calories} ккал</dd>

              <dt>Белки</dt>
              <dd>{protein} г</dd>

              <dt>Жиры</dt>
              <dd>{fat} г</dd>

              <dt>Углеводы</dt>
              <dd>{carbs} г</dd>
            </dl>

            <section className={styles.composition}>
              <h2 className={styles.compositionTitle}>Состав</h2>
              <p className={styles.compositionText}>{composition}</p>
            </section>
          </div>
        </article>
      </main>
    </>
  )
}

export { ProductPage }
