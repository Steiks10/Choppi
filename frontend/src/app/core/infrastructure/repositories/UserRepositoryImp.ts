import { UserRepository } from "@/src/app/core/application/ports/UserRepository";
import { createUserDTO, createUserResponse } from "@/src/models/dtos/UserDtos";

export class ConcreteUserRepository implements UserRepository {
  async create(data: createUserDTO): Promise<createUserResponse> {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) throw new Error("Backend URL not configured");

    const res = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // credentials: "include",
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json?.message || `Error creating user: ${res.status}`);
    }
    return json as createUserResponse;
  }
}
