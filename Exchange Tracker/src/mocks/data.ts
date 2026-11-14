import type { Invoice } from '@/types/invoice'

export const invoices: Invoice[] = [
  { id: 'inv-001', product: 'Harina de trigo', quantity: 25, unitPrice: 18.5, currency: 'USD', date: '2026-11-01', status: 'paid' },
  { id: 'inv-002', product: 'Aceite vegetal', quantity: 12, unitPrice: 32, currency: 'USD', date: '2026-11-02', status: 'pending' },
  { id: 'inv-003', product: 'Arroz blanco', quantity: 40, unitPrice: 14.75, currency: 'USD', date: '2026-11-03', status: 'overdue' },
  { id: 'inv-004', product: 'Azúcar', quantity: 20, unitPrice: 16.25, currency: 'USD', date: '2026-11-04', status: 'paid' },
  { id: 'inv-005', product: 'Leche en polvo', quantity: 8, unitPrice: 42, currency: 'USD', date: '2026-11-05', status: 'pending' },
  { id: 'inv-006', product: 'Pasta', quantity: 30, unitPrice: 9.5, currency: 'USD', date: '2026-11-06', status: 'paid' },
  { id: 'inv-007', product: 'Café molido', quantity: 10, unitPrice: 27.8, currency: 'USD', date: '2026-11-07', status: 'pending' },
  { id: 'inv-008', product: 'Caraotas negras', quantity: 18, unitPrice: 12.4, currency: 'USD', date: '2026-11-08', status: 'overdue' },
]
