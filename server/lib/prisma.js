const {PrismaClient} = require('@prisma/client');
let prisma;
const globalAny = global;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient();
  }
  prisma = globalAny.prisma;
}

module.exports =  prisma;