import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import CreateStoreForm from "./CreateStoreForm";

function decodeRoleFromJwt(token?: string): "admin" | "comprador" | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    // invalidar si el token está expirado
    if (typeof json?.exp === "number" && json.exp * 1000 < Date.now()) return null;
    return json?.role ?? null;
  } catch {
    return null;
  }
}

async function fetchStores(searchParams?: { page?: string; limit?: string; q?: string }) {
  const hdrs = await headers();
  const cookieStore = await cookies();
  const protocol = hdrs.get("x-forwarded-proto") ?? "http";
  const host = hdrs.get("host") ?? "localhost:3000";

  const qs = new URLSearchParams();
  if (searchParams?.page) qs.set("page", searchParams.page);
  if (searchParams?.limit) qs.set("limit", searchParams.limit);
  if (searchParams?.q) qs.set("q", searchParams.q);

  const url = `${protocol}://${host}/api/stores${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      cookie: cookieStore.toString(),
    },
  });
  if (!res.ok) throw new Error("Error cargando tiendas");
  return res.json();
}

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const token = (await cookies()).get("session")?.value;
  const role = decodeRoleFromJwt(token);
  if (!role) {
    redirect("/"); // sin sesión o expirada => volver a login
  }
  const isAdmin = role === "admin";

  const sp = await searchParams;
  const params = {
    page: Array.isArray(sp.page) ? sp.page[0] : sp.page,
    limit: Array.isArray(sp.limit) ? sp.limit[0] : sp.limit,
    q: Array.isArray(sp.q) ? sp.q[0] : sp.q,
  };

  const data = await fetchStores(params);
  const items = (data?.data ?? data?.items) as Array<{ id: string; name: string; ubication: string; description?: string | null }> | undefined;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF7EC] via-[#FFF2E1] to-[#FFE8CF]">
      <nav className="sticky top-0 z-10 border-b border-[#FFD8A8] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-8 border-[#F6A54D] bg-transparent" aria-hidden />
            <span className="text-2xl font-extrabold text-[#F6A54D]">choppi</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#7A4A00]">
              {isAdmin ? "Administrador" : "Comprador"}
            </span>
            <a
              href="/api/auth/login?logout=1"
              className="rounded-lg bg-[#F6A54D] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#E58E2C]"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900">Tiendas</h1>
          {isAdmin && (
            <div className="mt-4">
              <CreateStoreForm />
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items?.length ? (
            items.map((s) => (
              <Link key={s.id} href={`/stores/${s.id}`} className="rounded-2xl border border-[#FFD8A8] bg-white p-4 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-[#E0891A]">{s.name}</h3>
                <p className="text-sm text-[#7A4A00]">Ubicación: {s.ubication}</p>
                {s.description && <p className="mt-1 text-sm text-zinc-600">{s.description}</p>}
              </Link>
            ))
          ) : (
            <p className="text-sm text-zinc-600">No hay tiendas disponibles.</p>
          )}
        </section>
      </div>
    </main>
  );
}
