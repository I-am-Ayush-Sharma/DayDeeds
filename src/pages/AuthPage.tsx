import { SignIn, SignUp, useUser } from "@clerk/react";
import { BookHeart, Sparkles } from "lucide-react";
import { Navigate } from "react-router-dom";

type AuthPageProps = {
  mode: "login" | "signup";
};

function AuthPage({ mode }: AuthPageProps) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5e9da] text-[#4d3124]">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const appearance = {
    variables: {
      colorPrimary: "#3b261a",
      colorBackground: "#fffaf3",
      colorInputBackground: "#fffaf3",
      colorInputText: "#3d2c24",
      colorText: "#3d2c24",
      colorTextSecondary: "#6d4735",
      borderRadius: "16px",
      fontFamily: "inherit",
    },
    elements: {
      card: "shadow-[0_25px_80px_rgba(91,54,35,0.12)] border border-[#d7b18d] rounded-[28px]",
      formButtonPrimary: "bg-[#3b261a] hover:bg-[#4d2f1f] text-[#f9e2b0]",
      socialButtonsBlockButton: "border-[#d7b18d] bg-[#fffaf3] text-[#3d2c24]",
      footerActionLink: "text-[#a85a2e]",
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5e9da] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#d7b18d] bg-[#fffaf3] shadow-[0_25px_80px_rgba(91,54,35,0.12)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-[#f5d3a7] via-[#f1c28f] to-[#d59f73] p-10 text-[#4d3124] lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fffaf3]/70 text-[#5a3427] shadow-sm">
                <BookHeart className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold tracking-wide">Daylog</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-[#6d4735]">Reflect with intention</p>
              <h1 className="max-w-sm text-4xl font-bold leading-tight">Turn your daily moments into clarity.</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf3]/80 text-[#7f4d34]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI journaling companion</p>
              <p className="text-sm text-[#55372d]">Thoughtful reflection and daily progress.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {mode === "login" ? (
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/signup"
              forceRedirectUrl="/"
              appearance={appearance}
            />
          ) : (
            <SignUp
              path="/signup"
              routing="path"
              signInUrl="/login"
              forceRedirectUrl="/"
              appearance={appearance}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
