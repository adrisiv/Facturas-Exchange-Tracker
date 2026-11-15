import { http, HttpResponse } from 'msw'
import type { Invoice, InvoiceInput, User } from '@/types'
import { invoices as initialInvoices, todayRate, users, withTotals } from './data.ts'

let invoices = [...initialInvoices]
let currentUser: User | null = null

const makeUser = (email: string, name?: string): User =>
  users.find((user) => user.email === email) ?? {
    id: `user-${crypto.randomUUID()}`,
    name: name || email.split('@')[0] || 'Usuario de prueba',
    email,
    role: 'ambos',
  }

export const handlers = [
  http.post('*/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string }
    currentUser = makeUser(body.email ?? 'demo@example.com')
    return HttpResponse.json({ user: currentUser, token: 'mock-token' })
  }),

  http.post('*/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as Partial<User>
    currentUser = makeUser(body.email ?? 'demo@example.com', body.name)
    return HttpResponse.json({ user: currentUser, token: 'mock-token' }, { status: 201 })
  }),

  http.get('*/api/auth/me', () =>
    currentUser
      ? HttpResponse.json({ user: currentUser })
      : HttpResponse.json({ message: 'No hay una sesión activa' }, { status: 401 }),
  ),

  http.get('*/api/rates/today', () => HttpResponse.json(todayRate)),

  http.get('*/api/invoices', () => HttpResponse.json(invoices)),

  http.post('*/api/invoices', async ({ request }) => {
    const body = (await request.json()) as InvoiceInput
    const now = new Date().toISOString()
    const invoice: Invoice = {
      ...body,
      ...withTotals(body),
      id: `inv-${crypto.randomUUID()}`,
      createdAt: now,
      updatedAt: now,
    }
    invoices = [...invoices, invoice]
    return HttpResponse.json(invoice, { status: 201 })
  }),

  http.put('*/api/invoices/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<InvoiceInput>
    const index = invoices.findIndex((invoice) => invoice.id === params.id)
    if (index === -1) return HttpResponse.json({ message: 'Factura no encontrada' }, { status: 404 })

    const merged = { ...invoices[index]!, ...body }
    const invoice: Invoice = { ...merged, ...withTotals(merged), updatedAt: new Date().toISOString() }
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
