import Logo from "@/components/layout/Logo";
import AuthForm from "@/components/store/AuthForm";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-green-700 font-bold text-2xl mb-2">
            <Logo />
            <span>
              Yomi&apos;s <span className="text-stone-600">Garden</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">Tu cuenta personal</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
