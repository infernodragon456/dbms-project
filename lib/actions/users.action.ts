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
    const existingUser = await prisma.users.findMany({
      where: {
        email: email
      },
    })
    if (existingUser.length == 0){
      const uid = randomBytes(5).toString('hex').substring(0, 10);
      console.log((uid))
      console.log(firstname, lastname, email, pwd)
      const user = await prisma.users.create({
          data: {
            uid: uid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            pwd: pwd
          },
        })
    } else {
      throw new Error('Email is already registered with an existing user! Either log in or use a different email.');
    }
    
  } catch (err) {
    console.error("error executing query:", err);
    throw err
  } finally {
    prisma.$disconnect();
  }
};

export async function findUser(selectedAttribute: string, attributeValue: string) {
  try {
    const existingUser = await prisma.users.findMany({
      where: {
        [selectedAttribute]: attributeValue
      },
    })

    if (existingUser.length == 0){
      throw new Error('No user found with this ' + selectedAttribute + ' !')
    } else {
      return existingUser
    }

  } catch (err) {
    console.error("error executing query:", err);
    throw err
  } finally {
    prisma.$disconnect()
  }
}