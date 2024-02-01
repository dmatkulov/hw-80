export interface OfficeItem {
  id: number;
  categoryId: number;
  placeId: number;
  name: string;
  description: string;
  image: string | null;
}

export type OfficeItemWithoutId = Omit<OfficeItem, 'id'>;

export interface OfficeElement {
  id: number;
  name: string;
  description: string | null;
}

export type OfficeElementWithoutId = Omit<OfficeElement, 'id'>;

export interface ApiOfficeElement {
  id: number;
  name: string;
}
