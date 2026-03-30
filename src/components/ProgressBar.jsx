
const ProgressBar = ({ value = 0, label }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm text-slate-600">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  </div>
);

export default ProgressBar;
