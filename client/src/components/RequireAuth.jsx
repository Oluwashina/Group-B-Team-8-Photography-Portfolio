import { PageHeaderShimmer, ShimmerBlock } from "./Shimmer.jsx";
import { useAuth } from "../context/useAuth.js";

export default function RequireAuth({ children, title = "Sign in required" }) {
  const { user, status, openAuth } = useAuth();

  if (status === "loading") {
    return (
      <div className="py-8" role="status" aria-label="Loading account">
        <PageHeaderShimmer />
        <ShimmerBlock className="mx-auto mt-12 h-11 w-40 rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col justify-center py-12 text-center">
        <h1 className="font-serif text-2xl text-stone-100">{title}</h1>
        <p className="mt-3 text-stone-400">
          Sign in to view this page and keep your cart tied to your account.
        </p>
        <button
          type="button"
          onClick={() => openAuth("login")}
          className="mt-6 rounded-full bg-[#ddc9a8] px-6 py-2.5 text-sm font-semibold text-[#0a0908] hover:bg-[#c8b08a]"
        >
          Sign in
        </button>
      </div>
    );
  }

  return children;
}
