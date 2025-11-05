"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CreateProductForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const storeId = params?.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "");
    const description = String(form.get("description") || "");
    const category = String(form.get("category") || "");
    const price = Number(form.get("price") || 0);
    const stock = Number(form.get("stock") || 0);

    try {
      if (!storeId) throw new Error("Tienda no encontrada");

      // 1) Crear producto
      const createRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, category, price }),
      });
      const createData = await createRes.json().catch(() => ({}));
      if (!createRes.ok) {
        throw new Error(createData?.message || `Error creando producto (${createRes.status})`);
      }
      const productId: string | undefined = createData?.data?.id ?? createData?.id;
      if (!productId) throw new Error("No se obtuvo el ID del producto");

      // 2) Asociar a la tienda
      const linkRes = await fetch(`/api/stores/${storeId}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, price, stock }),
      });
      if (!linkRes.ok) {
        const linkData = await linkRes.json().catch(() => ({}));
        throw new Error(linkData?.message || `Error agregando a la tienda (${linkRes.status})`);
      }

      formEl.reset();
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Error creando y asociando producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border border-[#FFD8A8] p-4 bg-white">
      <h3 className="font-semibold text-[#E0891A]">Crear producto</h3>
      <input name="name" placeholder="Nombre" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="category" placeholder="Categoría" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="price" type="number" step="0.01" min="0" placeholder="Precio" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="stock" type="number" min="0" placeholder="Stock inicial" required className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      <input name="description" placeholder="Descripción (opcional)" className="w-full rounded border px-3 py-2 text-[#7A4A00]" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="rounded bg-[#4CAF50] px-4 py-2 text-white">
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}
