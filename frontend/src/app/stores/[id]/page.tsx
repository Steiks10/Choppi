import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreateProductForm from "./CreateProductForm";

function decodeRoleFromJwt(token?: string): "admin" | "comprador" | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    if (typeof json?.exp === "number" && json.exp * 1000 < Date.now()) return null;
    return json?.role ?? null;
  } catch {
    return null;
  }
}

async function fetchStoreProducts(storeId: string, searchParams?: { page?: string; limit?: string; q?: string; inStock?: string }) {
  const hdrs = await headers();
  const cookieStore = await cookies();
  const protocol = hdrs.get("x-forwarded-proto") ?? "http";
  const host = hdrs.get("host") ?? "localhost:3000";

  const qs = new URLSearchParams();
  if (searchParams?.page) qs.set("page", searchParams.page);
  if (searchParams?.limit) qs.set("limit", searchParams.limit);
  if (searchParams?.q) qs.set("q", searchParams.q);
  if (searchParams?.inStock) qs.set("inStock", searchParams.inStock);

  const url = `${protocol}://${host}/api/stores/${storeId}/products${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { cookie: cookieStore.toString() },
  });
  if (!res.ok) throw new Error("Error cargando productos");
  return res.json();
}

async function deleteStoreProduct(storeId: string, storeProductId: string) {
  "use server";
  const hdrs = await headers();
  const cookieStore = await cookies();
  const protocol = hdrs.get("x-forwarded-proto") ?? "http";
  const host = hdrs.get("host") ?? "localhost:3000";
  const url = `${protocol}://${host}/api/stores/${storeId}/products/${storeProductId}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: { cookie: cookieStore.toString() },
  });
  if (!res.ok) throw new Error("Error eliminando producto");
}

export default async function StoreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const token = (await cookies()).get("session")?.value;
  const role = decodeRoleFromJwt(token);
  if (!role) redirect("/");
  const isAdmin = role === "admin";

  const { id } = await params;
  const sp = await searchParams;
  const listParams = {
    page: Array.isArray(sp.page) ? sp.page[0] : sp.page,
    limit: Array.isArray(sp.limit) ? sp.limit[0] : sp.limit,
    q: Array.isArray(sp.q) ? sp.q[0] : sp.q,
    inStock: Array.isArray(sp.inStock) ? sp.inStock[0] : sp.inStock,
  };

  const data = await fetchStoreProducts(id, listParams);
  const items = (data?.items ?? []) as Array<{
    id: string;         // storeProductId
    productId: string;
    price: number;
    stock: number;
    name: string;
    description?: string;
    category: string;
  }>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7EC] via-[#FFF2E1] to-[#FFE8CF]">
      <nav className="sticky top-0 z-10 border-b border-[#FFD8A8] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-8 border-[#F6A54D] bg-transparent" aria-hidden />
            <span className="text-2xl font-extrabold text-[#F6A54D]">choppi</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/stores" className="text-sm font-medium text-[#7A4A00] hover:underline">Volver a tiendas</Link>
            <span className="text-sm font-medium text-[#7A4A00]">{isAdmin ? "Administrador" : "Comprador"}</span>
            <a href="/api/auth/login?logout=1" className="rounded-lg bg-[#F6A54D] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#E58E2C]">
              Cerrar sesión
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">Productos</h1>
          {isAdmin && (
            <div className="mt-4">
              <CreateProductForm />
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.length ? (
            items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-[#FFD8A8] bg-white p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[#E0891A]">{it.name}</h3>
                <p className="text-sm text-[#7A4A00]">Categoría: {it.category}</p>
                {it.description && <p className="mt-1 text-sm text-zinc-600">{it.description}</p>}
                <p className="mt-2 text-sm text-[#7A4A00]">Precio: ${Number(it.price).toFixed(2)} • Stock: {it.stock}</p>
                {isAdmin && (
                  <form
                    action={async () => {
                      "use server";
                      await deleteStoreProduct(id, it.id);
                    }}
                    className="mt-3"
                  >
                    <button type="submit" className="rounded bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
                      Eliminar
                    </button>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-600">No hay productos en esta tienda.</p>
          )}
        </section>
      </div>
    </main>
  );
}
