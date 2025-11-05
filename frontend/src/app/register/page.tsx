"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRole } from "@/src/models/User";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const role = UserRole.comprador; 

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Error ${res.status}`);
      }
      setSuccess(true);
      // router.push("/");
    } catch (err: any) {
      setError(err?.message || "Error creando usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7EC] via-[#FFF2E1] to-[#FFE8CF]">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 md:grid-cols-2">
        <section className="flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-8 border-[#F6A54D] bg-transparent" aria-hidden />
            <span className="text-2xl font-extrabold text-[#F6A54D]">choppi</span>
          </div>
          <div className="mt-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
              Crea tu cuenta
            </h1>
            <p className="mt-4 max-w-md text-zinc-600">
              Regístrate para comenzar a comprar más fácil y rápido.
            </p>
          </div>
          <p className="mt-16 text-sm text-zinc-500">© {new Date().getFullYear()} Choppi</p>
        </section>

        <section className="flex items-center bg-white/70 p-8 md:p-12">
          <div className="w-full rounded-2xl border border-[#FFD8A8] bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">Registro</h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#E0891A]">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[#7A4A00]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#E0891A]">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tú@correo.com"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[#7A4A00]"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#E0891A]">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[#7A4A00]"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">Usuario creado con éxito.</p>}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#4CAF50] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[#43A047] disabled:opacity-60"
              >
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-700">
              ¿Ya tienes cuenta?{" "}
              <Link href="/" className="font-semibold text-[#E0891A] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
