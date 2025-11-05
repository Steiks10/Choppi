"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStoreForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formEl = e.currentTarget; // capturar referencia antes del await
    const form = new FormData(formEl);
    const name = String(form.get("name") || "");
    const ubication = String(form.get("ubication") || "");
    const description = String(form.get("description") || "");

    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ubication, description }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Error ${res.status}`);
      }
      formEl.reset(); // usar la referencia persistida
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error creando tienda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-[#FFD8A8] p-4 bg-white">
      <h3 className="font-semibold text-[#E0891A]">Crear tienda</h3>
      <input name="name" placeholder="Nombre" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="ubication" placeholder="Ubicación" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="description" placeholder="Descripción (opcional)" className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="rounded bg-[#4CAF50] px-4 py-2 text-white">
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}
