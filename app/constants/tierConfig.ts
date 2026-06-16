
export const tierConfig = {
  bronze: {
    label: "Bronce",
    color: "text-amber-700",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    next: 300,
    nextTier: "Plata",
    emoji: "🥉",
  },
  silver: {
    label: "Plata",
    color: "text-gray-500",
    bg: "bg-gray-50 dark:bg-gray-800/50",
    border: "border-gray-200 dark:border-gray-700",
    next: 1000,
    nextTier: "Oro",
    emoji: "🥈",
  },
  gold: {
    label: "Oro",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    next: null,
    nextTier: null,
    emoji: "🥇",
  },
};