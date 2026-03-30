
const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-green">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-bold text-brand-navy">{title}</h2>
      {description ? <p className="mt-3 text-slate-600">{description}</p> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);

export default SectionHeader;
