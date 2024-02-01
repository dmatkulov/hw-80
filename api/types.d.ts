export interface OfficeItem {
  id: number;
  categoryId: number;
  placeId: number;
  name: string;
  description: string;
  image: string | null;
}

export type OfficeItemWithoutId = Omit<OfficeItem, 'id'>;

export interface CategoryOrPlace {
  id: number;
  name: string;
  description: string | null;
}

export type CategoryOrPlaceWithoutId = Omit<CategoryOrPlace, 'id'>;

export interface ApiCategoryOrPlace {
  id: number;
  name: string;
}
