import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { setupServer } from 'msw/node'
import { handlers } from './handlers.ts'

const server = setupServer(...handlers)
const api = 'http://localhost/api'

before(() => server.listen({ onUnhandledRequest: 'error' }))
after(() => server.close())

test('mock API supports auth, rates, and invoice CRUD', async () => {
  const login = await fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'demo@example.com', password: 'demo' }),
  })
  assert.equal(login.status, 200)

  const me = await fetch(`${api}/auth/me`)
  assert.equal((await me.json()).user.email, 'demo@example.com')

  const register = await fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'new@example.com', password: 'demo' }),
  })
  assert.equal(register.status, 201)

  const rates = await fetch(`${api}/rates/today`)
  const rateData = await rates.json()
  assert.equal(rates.status, 200)
  assert.equal(rateData.base, 'USD')

  const initialResponse = await fetch(`${api}/invoices`)
  const initialInvoices = await initialResponse.json()
  assert.equal(initialInvoices.length, 8)

  const createdResponse = await fetch(`${api}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product: 'Producto de prueba',
      quantity: 2,
      unitPrice: 5,
      currency: 'USD',
      date: '2026-11-14',
      status: 'pending',
    }),
  })
  const createdInvoice = await createdResponse.json()
  assert.equal(createdResponse.status, 201)
  assert.ok(createdInvoice.id)

  const updatedResponse = await fetch(`${api}/invoices/${createdInvoice.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'paid' }),
  })
  assert.equal(updatedResponse.status, 200)
  assert.equal((await updatedResponse.json()).status, 'paid')

  const deletedResponse = await fetch(`${api}/invoices/${createdInvoice.id}`, { method: 'DELETE' })
  assert.equal(deletedResponse.status, 204)

  const finalResponse = await fetch(`${api}/invoices`)
  assert.equal((await finalResponse.json()).length, 8)
})
