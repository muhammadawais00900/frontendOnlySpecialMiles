
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto max-w-xl px-4 py-24 text-center">
    <h1 className="text-5xl font-bold text-brand-navy">404</h1>
    <p className="mt-4 text-slate-600">The page you are looking for could not be found.</p>
    <Link to="/" className="mt-8 inline-flex rounded-2xl bg-brand-navy px-5 py-3 font-semibold text-white">
      Return home
    </Link>
  </div>
);

export default NotFoundPage;
