import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

export default prisma;
prisma.user.update({
    where: { id: "some-id" },
    data: { name: "New Name" },
})