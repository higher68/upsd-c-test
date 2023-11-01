import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const company = await prisma.company.create({
    data: {
      corporate_name: 'haya',
      representative_name: 'haya',
      phone_number: '000-00000-0000',
      postal_code: '231-0022',
      address: 'hage',
    },
  });
  await prisma.client.create({
    data: {
      corporate_name: 'haya',
      representative_name: 'haya',
      phone_number: '000-00000-0000',
      postal_code: '231-0022',
      address: 'hage',
      company_uid: company.company_uid,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
