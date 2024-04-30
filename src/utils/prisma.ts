import { PrismaClient } from '@prisma/client'

declare global {
  var cachedPrismaClient: PrismaClient
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!global.cachedPrismaClient) {
    global.cachedPrismaClient = new PrismaClient()
  }
  db = global.cachedPrismaClient
}

export default db
