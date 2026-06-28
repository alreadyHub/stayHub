export default function MacroBar({ label, current, total, color }) {
  const pct = Math.min((current / total) * 100, 100)
  const remaining = total - current

  return (
    <div className="flex-1">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[10px] font-semibold text-ch-muted uppercase tracking-wide">{label}</span>
        <span className="text-[11px] font-bold text-ch-text">{remaining}g left</span>
      </div>
      <div className="h-1.5 bg-ch-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="text-[10px] text-ch-muted mt-0.5">{current} / {total}g</div>
    </div>
  )
}
