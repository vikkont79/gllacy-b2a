'use client'

import type { ProductTopping } from '@/entities/product/types'

import { groupToppingsByKind } from '../../lib'
import { ToppingGroup } from '../ToppingGroup/ToppingGroup'
import styles from './DictionariesPanel.module.css'

interface DictionariesPanelProps {
  readonly toppings: ProductTopping[]
  readonly usage: Record<number, number>
}

const DictionariesPanel = ({ toppings, usage }: DictionariesPanelProps) => {
  const groups = groupToppingsByKind(toppings)

  return (
    <div className={styles.groups}>
      {groups.map((group) => (
        <ToppingGroup key={group.kind} group={group} usage={usage} />
      ))}
    </div>
  )
}

export { DictionariesPanel }
