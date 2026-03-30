
import logo from './logo.png';

const Logo = ({ compact = false }) => (
  <div className="flex items-center gap-3">
    <img src={logo} alt="Special Miles logo" className={compact ? 'h-10 w-10 rounded-2xl' : 'h-12 w-12 rounded-2xl'} />
    <div>
      <p className="text-base font-bold text-brand-navy">Special Miles</p>
      {!compact && <p className="text-xs text-slate-500">Neurodiversity inclusion hub</p>}
    </div>
  </div>
);

export default Logo;
