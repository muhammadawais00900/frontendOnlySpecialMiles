
import { clsx } from '../utils/helpers';

const variants = {
  info: 'border-sky-200 bg-sky-50 text-sky-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800'
};

const Alert = ({ children, variant = 'info' }) => (
  <div className={clsx('rounded-2xl border px-4 py-3 text-sm shadow-soft', variants[variant])}>
    {children}
  </div>
);

export default Alert;
