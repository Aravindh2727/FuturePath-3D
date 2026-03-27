import { create } from "zustand";
import { firebaseEnabled, firebaseSignIn, firebaseSignOut, onFirebaseAuth } from "../lib/firebase";

const allowedAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL ?? "blackpanther272007@gmail.com").toLowerCase();

type AuthState = {
  user: { uid: string; email?: string } | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  init: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  init: () => {
    if (!firebaseEnabled) return;
    onFirebaseAuth((u) => {
      const email = u?.email?.toLowerCase();
      if (allowedAdminEmail && email && email !== allowedAdminEmail) {
        firebaseSignOut();
        set({ user: null, error: "Unauthorized admin user" });
        return;
      }
      set({ user: u ? { uid: u.uid, email: u.email ?? undefined } : null });
    });
  },
  signIn: async (email, password) => {
    if (allowedAdminEmail && email.toLowerCase() !== allowedAdminEmail) {
      set({ error: "Only the authorized admin account can sign in." });
      return;
    }
    if (!firebaseEnabled) {
      set({ error: "Firebase is not enabled; admin login requires Firebase email/password auth." });
      return;
    }
    set({ loading: true, error: null });
    try {
      const res = await firebaseSignIn(email, password);
      set({ user: { uid: res.user.uid, email: res.user.email ?? undefined }, loading: false });
    } catch (e: any) {
      set({ error: e.message ?? "Login failed", loading: false });
    }
  },
  signOut: async () => {
    if (firebaseEnabled) await firebaseSignOut();
    set({ user: null });
  },
}));
