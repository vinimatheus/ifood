import { PrismaClient } from '@prisma/client'

// Declare a global module that extends the global namespace directly.
declare global {
  // eslint-disable-next-line no-var
  var cachedPrismaClient: PrismaClient | undefined
}

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  // Check if the cachedPrismaClient is not initialized
  if (!global.cachedPrismaClient) {
    global.cachedPrismaClient = new PrismaClient()
  }
  db = global.cachedPrismaClient
}

export default db
