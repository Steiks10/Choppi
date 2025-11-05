import { CreateStoreDTO, StoreResponse } from "@/src/models/dtos/StoreDtos";

export interface CreateStoreUseCase {
  createStore(dto: CreateStoreDTO): Promise<StoreResponse>;
}
