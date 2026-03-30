
const EmptyState = ({ title = 'Nothing here yet', description = 'We will show items here as soon as they are available.' }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-soft">
    <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
  </div>
);

export default EmptyState;
