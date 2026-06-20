import { Leaf, Truck, Star, Heart } from "lucide-react";

const stats = [
  { icon: Leaf, label: "+500 plantas vendidas", color: "text-green-500" },
  { icon: Truck, label: "Envío seguro garantizado", color: "text-blue-500" },
  { icon: Star, label: "4.9/5 en satisfacción", color: "text-amber-500" },
  { icon: Heart, label: "100% venezolano 🇻🇪", color: "text-red-500" },
];

export default function TrustBar() {
  return (
    <section className="py-8 px-4 bg-green-50 dark:bg-green-950/20 border-y border-green-100 dark:border-green-900/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <Icon className={`size-5 shrink-0 ${color}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
