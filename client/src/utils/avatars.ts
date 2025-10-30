// Public assets (these paths work because files are in client/public/avatars)
export const avatars = [
  "/avatars/fox.png",
  "/avatars/wolf.png",
  "/avatars/cat.png",
  "/avatars/bear.png",
  "/avatars/rabbit.png",
  "/avatars/tiger.png",
  "/avatars/owl.png",
  "/avatars/dragon.png",
  "/avatars/snake.png",
  "/avatars/frog.png",
];

// deterministic avatar per user (so it doesn't change on refresh)
export function getAvatarForUser(userId: number) {
  return avatars[userId % avatars.length];
}

// random, if you ever need it
export function getRandomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}
