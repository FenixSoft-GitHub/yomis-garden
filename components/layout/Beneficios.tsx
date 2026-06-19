import { Leaf, Shield, Truck } from 'lucide-react';

const itemBeneficios = [
  {
    icon: Leaf,
    title: "Plantas saludables",
    desc: "Cultivadas y seleccionadas directamente en nuestro vivero con los más altos estándares.",
    color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
  },
  {
    icon: Truck,
    title: "Envío seguro",
    desc: "Empaque especial para plantas vivas. Envíos locales y nacionales de accesorios.",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Garantía de calidad",
    desc: "Si tu planta llega en mal estado, la reponemos. Tu satisfacción es nuestra prioridad.",
    color:
      "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  },
];

export default function HeroCarousel() {
  return (
    <section className="py-16 px-4 bg-green-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {itemBeneficios.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="flex flex-col items-center gap-3">
            <div
              className={`size-12 rounded-full flex items-center justify-center ${color}`}
            >
              <Icon className="size-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
