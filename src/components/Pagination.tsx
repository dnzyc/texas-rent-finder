"use client";

export function Pagination({ page, pages, onPageChange }: { page: number; pages: number; onPageChange: (p: number) => void }) {
  if (pages <= 1) return null;

  const range = (): (number | "...")[] => {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
    const r: (number | "...")[] = [1];
    const start = Math.max(2, page - 2);
    const end = Math.min(pages - 1, page + 2);
    if (start > 2) r.push("...");
    for (let i = start; i <= end; i++) r.push(i);
    if (end < pages - 1) r.push("...");
    r.push(pages);
    return r;
  };

  return (
    <div className="flex items-center justify-center gap-1 p-3">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">←</button>
      {range().map((p, i) =>
        p === "..." ? <span key={`d${i}`} className="px-2 text-gray-400">…</span> :
        <button key={p} onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 rounded border text-sm hover:bg-gray-50 ${p === page ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" : ""}`}>
          {p}
        </button>
      )}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= pages}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">→</button>
    </div>
  );
}
