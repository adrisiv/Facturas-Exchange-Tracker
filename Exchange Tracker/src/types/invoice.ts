export interface Invoice {
  id: string
  product: string
  quantity: number
  unitPrice: number
  currency: string
  date: string
  status: 'pending' | 'paid' | 'overdue'
}
