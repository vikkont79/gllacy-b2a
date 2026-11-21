export const formatProductCount = (count: number) => {
  const isSingular = count % 10 === 1 && count % 100 !== 11

  return `${count} ${isSingular ? 'товаре' : 'товарах'}`
}
