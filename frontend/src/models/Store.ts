export interface Store {
  id: string;
  name: string;
  ubication: string;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
}
