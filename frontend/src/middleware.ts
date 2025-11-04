import { NextRequest, NextResponse } from "next/server";
import { AuthGuard, UserRoles } from "@/core/infrastructure/guards/AuthGuard";
import { ErrorHandler } from "@/utils/errorHandler";

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  "/",
  "/api/auth",
  "/api/login",
  "/auth",
  "/login",
  "/recover-password",
  "/reset-password",
  // Páginas de error
  "/error/401",
  "/error/403",
  "/error/404",
  "/error/500",
];

// Configuración de roles permitidos por ruta
const roleBasedRoutes: Record<string, UserRoles[]> = {
  // Rutas principales
  "/dashboard": ["Student", "Teacher", "Representative"],

  // Rutas de contenido
  "/content": ["Student", "Teacher"],
  "/activities": ["Student", "Teacher"],
  "/quiz": ["Student", "Teacher"],
  "/forums": ["Student", "Teacher"],
  "/forum": ["Student", "Teacher"],
  "/program-forums": ["Student", "Teacher"],
  "/surveys": ["Student"],
  "/schedule": ["Student", "Teacher"],
  "/profile": ["Student", "Teacher", "Representative"],

  // Rutas financieras
  "/invoice": ["Student", "Representative"],
  "/payment": ["Student", "Representative"],
  "/renovation": ["Student", "Representative"],

  // Rutas API
  "/api/profile": ["Student", "Teacher", "Representative"],
  "/api/content": ["Student", "Teacher"],
  "/api/course": ["Student", "Teacher"],
  "/api/quiz": ["Student", "Teacher"],
  "/api/forums": ["Student", "Teacher"],
  "/api/forum": ["Student", "Teacher"],
  "/api/survey": ["Student"],
  "/api/schedule": ["Student", "Teacher"],
  "/api/activity": ["Student", "Teacher"],
  "/api/invoice": ["Student", "Representative"],
  "/api/payment": ["Student", "Representative"],
  "/api/renovation": ["Student", "Representative"],
  "/api/students": ["Teacher", "Representative"],
  "/api/assistance": ["Student", "Teacher"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware - Current path:", pathname);

  // Verificar si la ruta actual es pública
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Middleware - Public route, allowing access");
    return NextResponse.next();
  }

  // Verificar si es una ruta de API
  const isApiRoute = pathname.startsWith("/api");

  // Obtener el token de diferentes fuentes
  const authHeader = request.headers.get("Authorization");
  const tokenCookie = request.cookies.get("token");

  const token = authHeader?.replace("Bearer ", "") || tokenCookie?.value;

  console.log("Middleware - Auth Header present:", !!authHeader);
  console.log("Middleware - Cookie Token present:", !!tokenCookie);
  console.log("Middleware - Final Token present:", !!token);

  // Si no hay token, manejar según el tipo de ruta
  if (!token) {
    console.log("Middleware - No token found");

    if (isApiRoute) {
      // Para API routes, devolver JSON con error
      return NextResponse.json(
        {
          error: "No autorizado",
          code: 401,
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    } else {
      // Para rutas de frontend, redirigir a página de error 401
      console.log("Middleware - Redirecting to 401 error page");
      return NextResponse.redirect(new URL("/error/401", request.url));
    }
  }

  try {
    // Usar AuthGuard para verificar el token y los roles
    const authGuard = new AuthGuard();

    // Verificar si el token es válido
    if (!authGuard.isValidToken(token)) {
      console.log("Middleware - Token invalid or expired");

      if (isApiRoute) {
        return NextResponse.json(
          {
            error: "Token inválido o expirado",
            code: 401,
            timestamp: new Date().toISOString(),
          },
          { status: 401 }
        );
      } else {
        // Redirigir a página de error 401 para frontend
        console.log(
          "Middleware - Redirecting to 401 error page (expired token)"
        );
        return NextResponse.redirect(new URL("/error/401", request.url));
      }
    }

    // Obtener información del usuario
    const userInfo = authGuard.getUserId(token);
    console.log("Middleware - User role:", userInfo.role);

    // Determinar los roles permitidos para la ruta actual
    let routeMatch = null;
    let allowedRoles: UserRoles[] = [];

    // Buscar la configuración de ruta más específica que coincida con la ruta actual
    for (const route in roleBasedRoutes) {
      if (
        pathname.startsWith(route) &&
        (!routeMatch || route.length > routeMatch.length)
      ) {
        routeMatch = route;
        allowedRoles = roleBasedRoutes[route];
      }
    }

    // Si encontramos una configuración de ruta y el usuario no tiene el rol adecuado
    if (routeMatch && !authGuard.hasRole(token, allowedRoles)) {
      console.log(
        `Middleware - Access denied. Required roles: ${allowedRoles.join(
          ", "
        )}, User role: ${userInfo.role}`
      );

      if (isApiRoute) {
        return NextResponse.json(
          {
            error: `Acceso denegado. Se requiere uno de estos roles: ${allowedRoles.join(
              ", "
            )}`,
            code: 403,
            timestamp: new Date().toISOString(),
            userRole: userInfo.role,
            requiredRoles: allowedRoles,
          },
          { status: 403 }
        );
      } else {
        // Redirigir a página de error 403 para frontend
        console.log(
          "Middleware - Redirecting to 403 error page (insufficient permissions)"
        );
        return NextResponse.redirect(new URL("/error/403", request.url));
      }
    }

    console.log("Middleware - Access granted");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware - Error validating token:", error);

    if (isApiRoute) {
      // Usar el ErrorHandler para generar respuesta de error consistente
      return ErrorHandler.handleApiError(error, pathname);
    } else {
      // Para errores inesperados en frontend, redirigir a página de error 500
      console.log(
        "Middleware - Redirecting to 500 error page (unexpected error)"
      );
      return NextResponse.redirect(new URL("/error/500", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};