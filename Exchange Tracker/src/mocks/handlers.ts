import { http, HttpResponse } from 'msw'
import type { Invoice } from '@/types/invoice'
import { invoices as initialInvoices } from './data.ts'

interface MockUser {
  id: string
  name: string
  email: string
}

interface InvoiceInput {
  product: string
  quantity: number
  unitPrice: number
  currency: string
  date: string
  status: Invoice['status']
}

let invoices = [...initialInvoices]
let currentUser: MockUser | null = null

const makeUser = (email: string): MockUser => ({
  id: 'user-001',
  name: email.split('@')[0] || 'Usuario de prueba',
  email,
})

export const handlers = [
  http.post('*/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string }
    currentUser = makeUser(body.email ?? 'demo@example.com')
    return HttpResponse.json({ user: currentUser, token: 'mock-token' })
  }),

  http.post('*/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as { email?: string }
    currentUser = makeUser(body.email ?? 'demo@example.com')
    return HttpResponse.json({ user: currentUser, token: 'mock-token' }, { status: 201 })
  }),

  http.get('*/api/auth/me', () =>
    currentUser
      ? HttpResponse.json({ user: currentUser })
      : HttpResponse.json({ message: 'No hay una sesión activa' }, { status: 401 }),
  ),

  http.get('*/api/rates/today', () =>
    HttpResponse.json({ date: '2026-11-14', base: 'USD', rates: { EUR: 0.86, VES: 478.5 } }),
  ),

  http.get('*/api/invoices', () => HttpResponse.json(invoices)),

  http.post('*/api/invoices', async ({ request }) => {
    const body = (await request.json()) as InvoiceInput
    const invoice: Invoice = { ...body, id: `inv-${crypto.randomUUID()}` }
    invoices = [...invoices, invoice]
    return HttpResponse.json(invoice, { status: 201 })
  }),

  http.put('*/api/invoices/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<InvoiceInput>
    const index = invoices.findIndex((invoice) => invoice.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Factura no encontrada' }, { status: 404 })

    const invoice = { ...invoices[index]!, ...body }
    invoices = invoices.map((item, itemIndex) => (itemIndex === index ? invoice : item))
    return HttpResponse.json(invoice)
  }),

  http.delete('*/api/invoices/:id', ({ params }) => {
    const remaining = invoices.filter((invoice) => invoice.id !== params.id)
    if (remaining.length === invoices.length) {
      return HttpResponse.json({ message: 'Factura no encontrada' }, { status: 404 })
    }

    invoices = remaining
    return new HttpResponse(null, { status: 204 })
  }),
]
