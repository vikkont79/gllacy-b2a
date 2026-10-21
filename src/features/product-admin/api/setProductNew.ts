'use server'

import { setFlag, type SetFlagResult } from './setFlag'

export type SetProductNewResult = SetFlagResult

export const setProductNew = async (
  productId: number,
  value: boolean,
): Promise<SetProductNewResult> => setFlag(productId, 'isNew', value)
