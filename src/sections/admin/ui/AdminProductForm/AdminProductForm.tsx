import { getFlavours } from '@/entities/product/api/getFlavours'
import { getProductById } from '@/entities/product/api/getProductById'
import { getToppings } from '@/entities/product/api/getToppings'
import type {
  AdminProductDetails,
  FlavourOption,
  ProductTopping,
} from '@/entities/product/types'
import { ProductForm } from '@/features/product-admin/ui'
import { Button, ErrorState } from '@/shared/ui'

interface AdminProductFormProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const AdminProductForm = async ({ searchParams }: AdminProductFormProps) => {
  const params = await searchParams
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id
  const productId = idParam && /^\d+$/.test(idParam) ? Number(idParam) : null

  let product: AdminProductDetails | null = null
  let flavours: FlavourOption[] = []
  let toppings: ProductTopping[] = []
  let loadError = false

  try {
    const [loadedProduct, loadedFlavours, loadedToppings] = await Promise.all([
      productId === null ? Promise.resolve(null) : getProductById(productId),
      getFlavours(),
      getToppings(),
    ])

    product = loadedProduct
    flavours = loadedFlavours
    toppings = loadedToppings
  } catch (error) {
    console.error('AdminProductForm: не удалось загрузить данные:', error)
    loadError = true
  }

  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className="title">
        {productId === null ? 'Новый товар' : 'Редактирование товара'}
      </h1>

      {loadError ? (
        <ErrorState message="Не удалось загрузить данные товара. Попробуйте позже" />
      ) : productId !== null && product === null ? (
        <div>
          <ErrorState message="Товар не найден" />
          <Button href="/admin" variant="transparent">
            К списку товаров
          </Button>
        </div>
      ) : (
        <ProductForm product={product} flavours={flavours} toppings={toppings} />
      )}
    </main>
  )
}

export { AdminProductForm }
