export type Currency = 'USD' | 'EUR' | 'VES';
export type InvoiceType = 'compra' | 'venta';
export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

export interface ExchangeRate {
    date: string;
    usd: number;
    eur: number;
    source: 'BCV' | 'manual';
}

export interface Invoice {
    id: string;
    type: InvoiceType;
    status: InvoiceStatus;
    date: string;
    number?: string;
    party?: string;
    product: string;
    quantity: number;
    unitPrice: number;
    currency: Currency;
    rateUsd: number;
    rateEur: number;
    totalBs: number;
    totalUsd: number;
    totalEur: number;
    fileUrl?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type InvoiceInput = Omit<
    Invoice,
    'id' | 'createdAt' | 'updatedAt' | 'totalBs' | 'totalUsd' | 'totalEur'
>;

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: number;
    role: 'comprador' | 'vendedor' | 'ambos';
    business?: string;
}
// 1) Crea src/types/index.ts.
// 2) export type Currency = 'USD' | 'EUR' | 'VES'; export type InvoiceType = 'compra' | 'venta';
// 3) interface ExchangeRate { date: string; usd: number; eur: number; source: 'BCV' | 'manual' }
// 4) interface Invoice { id; type; date; number?; party?; product; quantity; unitPrice; currency; rateUsd; rateEur; totalBs; totalUsd; totalEur; fileUrl?; notes?; createdAt; updatedAt }
// 5) type InvoiceInput = Omit<Invoice, 'id' | 'createdAt' | 'updatedAt' | 'totalBs' | 'totalUsd' | 'totalEur'>
// 6) interface User { id; name; email; phone?; role: 'comprador' | 'vendedor' | 'ambos'; business? }
// 7) Revisadlo juntos y hacedlo coincidir con lo que devolverá el backend Express.