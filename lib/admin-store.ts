// In-memory store — persists within a serverless instance, resets on cold start

export interface ContactLog {
  id: string
  name: string
  email: string
  message: string
  timestamp: string
  ip: string
  emailSent: boolean
}

export interface VisitLog {
  path: string
  timestamp: string
  ip: string
  userAgent: string
  referer: string
}

const store = {
  contacts: [] as ContactLog[],
  visits: [] as VisitLog[],
}

export function logContact(entry: ContactLog) {
  store.contacts.unshift(entry)
  if (store.contacts.length > 50) store.contacts.pop()
}

export function logVisit(entry: VisitLog) {
  // Dedupe rapid repeat visits to the same path from the same IP within 5s
  const last = store.visits[0]
  if (
    last &&
    last.ip === entry.ip &&
    last.path === entry.path &&
    Date.now() - new Date(last.timestamp).getTime() < 5000
  ) return

  store.visits.unshift(entry)
  if (store.visits.length > 200) store.visits.pop()
}

export function getContacts() { return store.contacts }
export function getVisits()   { return store.visits   }
