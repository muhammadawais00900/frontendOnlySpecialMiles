import logo from './logo.png';

const Logo = ({ compact = false, showWordmark = true }) => (
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt="Special Miles logo"
      className={compact ? 'h-12 w-auto object-contain' : 'h-16 w-auto object-contain md:h-20'}
    />
    {showWordmark ? (
      <div className="leading-tight">
        <p className="text-lg font-semibold text-brand-navy md:text-xl">Special Miles</p>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-700">Every Mile Matters</p>
      </div>
    ) : null}
  </div>
);

export default Logo;
