import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  ["peshmay@example.com", "Pesh", "May."],
  ["erikaandersson@example.com", "Erika", "Andersson"],
  ["sanamaya@example.com", "Sana", "Maya"],
  ["elinkarlsson@example.com", "Elin", "Karlsson"],
  ["alexpersson@example.com", "Alex", "Persson"],
  ["sam@example.com", "Sam", "T."],
  ["julesnyman@example.com", "Jules", "Nyman"],
  ["ninapetesson@example.com", "Nina", "Petesson"],
];

const games = ["Chess", "Tetris", "Sudoku", "Snake"];

const avatars = [
  "../assets/avatars/fox.png",
  "../assets/avatars/wolf.png",
  "../assets/avatars/cat.png",
  "../assets/avatars/bear.png",
  "../assets/avatars/rabbit.png",
  "../assets/avatars/tiger.png",
  "../assets/avatars/owl.png",
  "../assets/avatars/dragon.png",
  "../assets/avatars/snake.png",
  "../assets/avatars/frog.png",
];

async function main() {
  for (const g of games) {
    await prisma.game.upsert({
      where: { name: g },
      update: {},
      create: { name: g },
    });
  }

  for (let i = 0; i < users.length; i++) {
    const [email, firstName, lastName] = users[i];
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        firstName,
        lastName,
        profilePic: avatars[i % avatars.length], // assign avatar in a round-robin way
      },
    });
  }

  const allUsers = await prisma.user.findMany();
  const allGames = await prisma.game.findMany();

  // generate some last-7-days sessions
  const now = new Date();
  for (const u of allUsers) {
    for (let i = 0; i < 6; i++) {
      const game = allGames[Math.floor(Math.random() * allGames.length)];
      const daysAgo = Math.floor(Math.random() * 7);
      const start = new Date(
        now.getTime() -
          daysAgo * 24 * 60 * 60 * 1000 -
          Math.floor(Math.random() * 4) * 60 * 60 * 1000
      );
      const seconds = 10 + Math.floor(Math.random() * 180); // simulate seconds => minutes
      const end = new Date(start.getTime() + seconds * 1000);
      const minutes = Math.max(
        1,
        Math.round((end.getTime() - start.getTime()) / 1000)
      ); // 1s = 1m

      await prisma.session.create({
        data: {
          userId: u.id,
          gameId: game.id,
          startedAt: start,
          endedAt: end,
          minutes,
        },
      });
    }
  }
}

main().finally(async () => prisma.$disconnect());
