'use server'

import { setFlag, type SetFlagResult } from './setFlag'

export type SetProductAvailabilityResult = SetFlagResult

export const setProductAvailability = async (
  productId: number,
  value: boolean,
): Promise<SetProductAvailabilityResult> => setFlag(productId, 'isAvailable', value)
