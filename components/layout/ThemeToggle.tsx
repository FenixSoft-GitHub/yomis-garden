"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-9 text-gray-600 hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
      aria-label="Cambiar tema"
    >
      {/* Renderizamos el icono basándonos en el tema. 
        Ponemos el Moon por defecto en el servidor para evitar saltos visuales si el usuario prefiere modo claro.
      */}
      {theme === "dark" ? (
        <Sun className="size-4 shrink-0 transition-all" />
      ) : (
        <Moon className="size-4 shrink-0 transition-all" />
      )}
    </Button>
  );
}

// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import { Sun, Moon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted)
//     return (
//       <Button variant="ghost" size="icon" className="size-9">
//         <span className="size-4" />
//       </Button>
//     );

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//       className="size-9 text-gray-600 hover:text-green-700 dark:text-gray-400 dark:hover:text-green-400"
//       aria-label="Cambiar tema"
//     >
//       {theme === "dark" ? (
//         <Sun className="size-4" />
//       ) : (
//         <Moon className="size-4" />
//       )}
//     </Button>
//   );
// }
