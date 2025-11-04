"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginController } from "@/src/app/core/infrastructure/controllers/LoginController";

const loginController = new LoginController();

export default function Home() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    try {
      const auth = await loginController.handleLogin({email, password});
      console.log("Auth OK:", auth);
      // TODO: guardar token, redirigir, etc.
    } catch (err) {
      console.error(err);
      // TODO: mostrar error en UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7EC] via-[#FFF2E1] to-[#FFE8CF]">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
        {/* Panel de marca */}
        <section className="flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full border-8 border-[#F6A54D] bg-transparent"
              aria-hidden
            />
            <span className="text-2xl font-extrabold text-[#F6A54D]">choppi</span>
          </div>

          <div className="mt-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
              Tus compras entregadas frescas y rápidas
            </h1>
            <p className="mt-4 max-w-md text-zinc-600">
              Inicia sesión para continuar con tus pedidos y recibir tus compras a la puerta de tu casa.
            </p>
          </div>

          <p className="mt-16 text-sm text-zinc-500">
            © {new Date().getFullYear()} Choppi
          </p>
        </section>

        {/* Card de login */}
        <section className="flex items-center bg-white/70 p-8 md:p-12">
          <div className="w-full rounded-2xl border border-[#FFD8A8] bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">Inicia sesión</h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tú@correo.com"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-[#F6A54D] focus:ring-2 focus:ring-[#FFD8A8]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-zinc-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-[#F6A54D] focus:ring-2 focus:ring-[#FFD8A8]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-zinc-300 text-[#F6A54D] focus:ring-[#F6A54D]"
                  />
                  Recuérdame
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-[#E0891A] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#F6A54D] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#E58E2C] disabled:opacity-60"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs text-zinc-500">o</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <button className="mt-6 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-[#FFD8A8] hover:bg-[#FFF7EC]">
              Continuar con Google
            </button>

            <p className="mt-6 text-center text-sm text-zinc-700">
              ¿No tienes cuenta?{" "}
              <Link href="#" className="font-semibold text-[#E0891A] hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
