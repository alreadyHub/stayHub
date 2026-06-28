export default function CalorieRing({ consumed, total, size = 80 }) {
  const r = (size / 2) - 8
  const circumference = 2 * Math.PI * r
  const pct = Math.min(consumed / total, 1)
  const offset = circumference * (1 - pct)
  const remaining = total - consumed

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#EBEBEB" strokeWidth="6"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#F5C518" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-ch-text leading-none">{remaining}</span>
        <span className="text-[9px] text-ch-muted font-medium">kcal left</span>
      </div>
    </div>
  )
}
