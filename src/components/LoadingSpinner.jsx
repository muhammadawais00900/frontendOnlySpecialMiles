
const LoadingSpinner = ({ label = 'Loading…' }) => (
  <div className="flex min-h-[200px] items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-soft">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-green" />
    <span>{label}</span>
  </div>
);

export default LoadingSpinner;
