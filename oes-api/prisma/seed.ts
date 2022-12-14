import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.invigilate.deleteMany();
  await prisma.examination.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.question.deleteMany();
  await prisma.answer.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'doan@oes.com',
      firstname: 'Nguyen Cong',
      lastname: 'Doan',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'STUDENT',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'dang@oes.com',
      firstname: 'Lo Ba',
      lastname: 'Hai Dang',
      role: 'LECTURER',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'thien@oes.com',
      firstname: 'Dang Van',
      lastname: 'Thien',
      role: 'STUDENT',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });

  console.log({ user1, user2, user3 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
