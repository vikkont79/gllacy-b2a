import type { Base } from '@/entities/product/types'

export const FATNESS_OPTIONS: ReadonlyArray<{ label: string; base: Base }> = [
  { label: 'до 5%', base: 'sorbet' },
  { label: 'до 12%', base: 'slivochnoe' },
  { label: 'выше 12%', base: 'plombir' },
]