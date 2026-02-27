import { useCallback, useState } from "react";
import { WAREHOUSES } from "../../../../utils/mock-warehouses";

import { SavedList, ToolKey } from "../../home.model";
import { initialRows } from "../../home.constant";
import { loadLists, saveLists } from "../../../../utils/inventory-lists";

export function useHomeDesktopController() {
  const [activeTool, setActiveTool] = useState<ToolKey>("factors");
  const activeTab: ToolKey = activeTool === "list" ? "list" : "factors";

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const [warehouseId, setWarehouseId] = useState(WAREHOUSES[0].id);
  const [rows, setRows] = useState<any[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [editingListId, setEditingListId] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setWarehouseId(WAREHOUSES[0].id);
    setRows(initialRows);
    setSelectedRow(null);
    setEditingListId(null);
    setResetKey((k) => k + 1);
  }, []);

  const openSavedList = useCallback((id: string) => {
    const lists = loadLists();
    const item = lists.find((x: SavedList) => x.id === id);
    if (!item) return;

    setWarehouseId(item.warehouseId ?? WAREHOUSES[0].id);

    const filled = Array.isArray(item.rows) ? [...item.rows] : [];
    while (filled.length < initialRows.length)
      filled.push({ row: filled.length + 1 });
    filled.forEach((r, i) => (r.row = i + 1));

    setRows(filled);
    setSelectedRow(null);

    setEditingListId(item.id);
    setActiveTool("factors");
  }, []);

  const handleConfirm = useCallback(() => {
    const lists: SavedList[] = loadLists();

    const cleanedRows = rows.filter(
      (r) =>
        String(r.code ?? "").trim() !== "" ||
        String(r.name ?? "").trim() !== "",
    );

    // UPDATE
    if (editingListId) {
      const idx = lists.findIndex((x) => x.id === editingListId);

      if (idx === -1) {
        const nextNumber = lists.length + 1;
        const payload: SavedList = {
          id: `list${nextNumber}`,
          title: `لیست${nextNumber}`,
          createdAt: new Date().toISOString(),
          warehouseId,
          rows: cleanedRows,
        };
        saveLists([...lists, payload]);
        setEditingListId(payload.id);
        return;
      }

      const prev = lists[idx];
      const updated: SavedList = { ...prev, warehouseId, rows: cleanedRows };

      const next = [...lists];
      next[idx] = updated;
      saveLists(next);
      return;
    }

    // CREATE
    const nextNumber = lists.length + 1;
    const payload: SavedList = {
      id: `list${nextNumber}`,
      title: `لیست${nextNumber}`,
      createdAt: new Date().toISOString(),
      warehouseId,
      rows: cleanedRows,
    };

    saveLists([...lists, payload]);
    setEditingListId(payload.id);
  }, [rows, editingListId, warehouseId]);

  const requestDelete = useCallback(() => {
    if (!editingListId) {
      resetForm();
      return;
    }
    setDeleteOpen(true);
  }, [editingListId, resetForm]);

  const confirmDelete = useCallback(() => {
    if (!editingListId) return;

    const lists: SavedList[] = loadLists();
    saveLists(lists.filter((x) => x.id !== editingListId));

    setDeleteOpen(false);
    resetForm();
    setActiveTool("factors");
  }, [editingListId, resetForm]);

  const cancelDelete = useCallback(() => setDeleteOpen(false), []);

  const getSortedLists = useCallback(() => {
    const items: SavedList[] = loadLists();
    return items.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, []);

  const goToIndex = useCallback(
    (idx: number) => {
      const items = getSortedLists();
      if (items.length === 0) return;

      const clamped = Math.max(0, Math.min(idx, items.length - 1));
      openSavedList(items[clamped].id);
    },
    [getSortedLists, openSavedList],
  );

  const getCurrentIndex = useCallback(() => {
    const items = getSortedLists();
    if (!editingListId) return { items, index: -1 };
    const index = items.findIndex((x) => x.id === editingListId);
    return { items, index };
  }, [getSortedLists, editingListId]);

  const handleFirst = useCallback(() => goToIndex(0), [goToIndex]);

  const handleLast = useCallback(() => {
    const items = getSortedLists();
    if (items.length === 0) return;
    goToIndex(items.length - 1);
  }, [getSortedLists, goToIndex]);

  const handlePrev = useCallback(() => {
    const { items, index } = getCurrentIndex();
    if (items.length === 0) return;

    if (index === -1) {
      goToIndex(items.length - 1);
      return;
    }

    if (index > 0) goToIndex(index - 1);
  }, [getCurrentIndex, goToIndex]);

  const handleNext = useCallback(() => {
    const { items, index } = getCurrentIndex();
    if (items.length === 0) return;

    if (index === -1) {
      goToIndex(0);
      return;
    }

    if (index < items.length - 1) goToIndex(index + 1);
  }, [getCurrentIndex, goToIndex]);

  const isFactors = activeTool === "factors";
  const isList = activeTool === "list";

  return {
    // state
    activeTool,
    activeTab,
    deleteOpen,
    resetKey,
    warehouseId,
    rows,
    selectedRow,
    editingListId,
    isFactors,
    isList,

    // setters
    setActiveTool,
    setWarehouseId,
    setRows,
    setSelectedRow,

    // actions
    resetForm,
    openSavedList,
    handleConfirm,
    requestDelete,
    confirmDelete,
    cancelDelete,
    handleFirst,
    handlePrev,
    handleNext,
    handleLast,
  };
}
