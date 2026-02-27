export type SavedList = {
  id: string;
  title: string;
  createdAt: string;
  warehouseId: string;
  rows: any[];
};

export const LS_KEY = "inventory_lists_v1";

export function loadLists(): SavedList[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLists(lists: SavedList[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(lists));
}

export function clearLists() {
  localStorage.removeItem(LS_KEY);
}
