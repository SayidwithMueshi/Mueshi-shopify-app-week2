import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

const prisma: PrismaClient = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
}

async function getAllCharities() {
  let charities = await prisma.charities.findMany()

  return charities.map((charity) => {
    return {
      id: charity.id,
      // url : JSON.parse(charity?.profile_media).src,
      name: charity.name,
    }
  })
}

function arrayToObject(arr: [string, any][]): { [key: string]: any } {
  return arr.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as { [key: string]: any })
}

async function saveResult(formData: any) {
  try {
    console.log(formData)
    console.log(formData._entries)

    const obj = arrayToObject(formData._entries)
    console.log(JSON.parse(obj.testData))

    formData = JSON.parse(obj.testData)

    console.log(formData.products)


    let res = await prisma.results.create({
      data: {
        name: formData.name,
        products: formData.products,
        percentage: formData.percentage,
      },
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

// export default prisma
export { saveResult, getAllCharities, prisma }
