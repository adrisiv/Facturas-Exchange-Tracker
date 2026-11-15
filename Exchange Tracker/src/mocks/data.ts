import type { ExchangeRate, Invoice, InvoiceInput, User } from '@/types'

const round = (value: number) => Math.round(value * 100) / 100

// Calcula los totales en Bs, USD y EUR a partir de la moneda y las tasas de la factura
export const withTotals = (input: InvoiceInput) => {
  const subtotal = input.quantity * input.unitPrice
  const totalBs =
    input.currency === 'USD'
      ? subtotal * input.rateUsd
      : input.currency === 'EUR'
        ? subtotal * input.rateEur
        : subtotal

  return {
    totalBs: round(totalBs),
    totalUsd: round(totalBs / input.rateUsd),
    totalEur: round(totalBs / input.rateEur),
  }
}

const makeInvoice = (id: string, input: InvoiceInput): Invoice => {
  const timestamp = `${input.date}T12:00:00.000Z`
  return { ...input, ...withTotals(input), id, createdAt: timestamp, updatedAt: timestamp }
}

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Demo',
    email: 'demo@example.com',
    phone: 4141234567,
    role: 'ambos',
    business: 'Bodega Demo C.A.',
  },
]

export const exchangeRates: ExchangeRate[] = [
  { date: '2026-11-01', usd: 470.2, eur: 545.43, source: 'BCV' },
  { date: '2026-11-02', usd: 471.05, eur: 546.42, source: 'BCV' },
  { date: '2026-11-03', usd: 472.3, eur: 547.87, source: 'BCV' },
  { date: '2026-11-04', usd: 473.1, eur: 548.8, source: 'BCV' },
  { date: '2026-11-05', usd: 474.45, eur: 550.36, source: 'BCV' },
  { date: '2026-11-06', usd: 475.2, eur: 551.23, source: 'BCV' },
  { date: '2026-11-07', usd: 476.6, eur: 552.86, source: 'manual' },
  { date: '2026-11-08', usd: 477.15, eur: 553.49, source: 'BCV' },
  { date: '2026-11-14', usd: 478.5, eur: 556.4, source: 'BCV' },
]

export const todayRate: ExchangeRate = exchangeRates[exchangeRates.length - 1]!

export const invoices: Invoice[] = [
  makeInvoice('inv-001', {
    type: 'compra',
    status: 'paid',
    date: '2026-11-01',
    number: 'F-000101',
    party: 'Molinos del Centro C.A.',
    product: 'Harina de trigo',
    quantity: 25,
    unitPrice: 18.5,
    currency: 'USD',
    rateUsd: 470.2,
    rateEur: 545.43,
    notes: 'Pago por transferencia',
  }),
  makeInvoice('inv-002', {
    type: 'venta',
    status: 'pending',
    date: '2026-11-02',
    number: 'V-000045',
    party: 'Panadería La Esquina',
    product: 'Aceite vegetal',
    quantity: 12,
    unitPrice: 32,
    currency: 'USD',
    rateUsd: 471.05,
    rateEur: 546.42,
  }),
  makeInvoice('inv-003', {
    type: 'compra',
    status: 'overdue',
    date: '2026-11-03',
    number: 'F-000102',
    party: 'Distribuidora Llanera',
    product: 'Arroz blanco',
    quantity: 40,
    unitPrice: 14.75,
    currency: 'USD',
    rateUsd: 472.3,
    rateEur: 547.87,
    notes: 'Vencida el 2026-11-10',
  }),
  makeInvoice('inv-004', {
    type: 'venta',
    status: 'paid',
    date: '2026-11-04',
    number: 'V-000046',
    party: 'Abasto San José',
    product: 'Azúcar',
    quantity: 20,
    unitPrice: 15,
    currency: 'EUR',
    rateUsd: 473.1,
    rateEur: 548.8,
  }),
  makeInvoice('inv-005', {
    type: 'compra',
    status: 'pending',
    date: '2026-11-05',
    number: 'F-000103',
    party: 'Lácteos Andinos S.A.',
    product: 'Leche en polvo',
    quantity: 8,
    unitPrice: 42,
    currency: 'USD',
    rateUsd: 474.45,
    rateEur: 550.36,
  }),
  makeInvoice('inv-006', {
    type: 'venta',
    status: 'paid',
    date: '2026-11-06',
    number: 'V-000047',
    party: 'Cliente de contado',
    product: 'Pasta',
    quantity: 30,
    unitPrice: 4500,
    currency: 'VES',
    rateUsd: 475.2,
    rateEur: 551.23,
    notes: 'Pago móvil',
  }),
  makeInvoice('inv-007', {
    type: 'compra',
    status: 'pending',
    date: '2026-11-07',
    number: 'F-000104',
    party: 'Café Montaña Alta',
    product: 'Café molido',
    quantity: 10,
    unitPrice: 27.8,
    currency: 'USD',
    rateUsd: 476.6,
    rateEur: 552.86,
  }),
  makeInvoice('inv-008', {
    type: 'venta',
    status: 'overdue',
    date: '2026-11-08',
    number: 'V-000048',
    party: 'Comercial El Sol',
    product: 'Caraotas negras',
    quantity: 18,
    unitPrice: 12.4,
    currency: 'USD',
    rateUsd: 477.15,
    rateEur: 553.49,
  }),
]
