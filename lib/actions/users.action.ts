'use server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUser() {
  try {
    const user = await prisma.users.create({
        data: {
          uid: '0000000000',
          firstname: 'Alice',
          lastname: 'Martin',
          email: 'alice@prisma.io',
          pwd: '1234'
        },
      })
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    prisma.$disconnect();
  }
};