import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import OrderNotifications from "@/components/store/OrderNotifications";
import CompareBar from "@/components/store/CompareBar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster richColors position="bottom-right" />
      <CartDrawer />
      <WhatsAppButton />
      <OrderNotifications />
      <CompareBar />
    </div>
  );
}
