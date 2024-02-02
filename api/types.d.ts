export interface OfficeItem {
  id: number;
  categoryId: number;
  placeId: number;
  name: string;
  description: string | null;
  image: string | null;
}

export type OfficeItemWithoutId = Omit<OfficeItem, 'id'>;

export interface Resource {
  name: string;
  description: string | null;
}