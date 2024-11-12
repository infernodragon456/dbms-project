'use server'
import { PrismaClient } from "@prisma/client";
import {randomBytes} from 'crypto'

const prisma = new PrismaClient();

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  pwd: string;
}

export async function addUser({firstname, lastname, email, pwd} : IFormData) {
  try {
    const uid = randomBytes(5).toString('hex').substring(0, 10);
    // console.log((uid))
    // console.log(firstname, lastname, email, pwd)
    const user = await prisma.users.create({
        data: {
          uid: uid,
          firstname: firstname,
          lastname: lastname,
          email: email,
          pwd: pwd
        },
      })
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    prisma.$disconnect();
  }
};