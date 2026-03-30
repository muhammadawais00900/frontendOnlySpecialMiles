
import { Facebook, Linkedin, Link2, Mail } from 'lucide-react';

const ShareButtons = ({ title, text, url = window.location.href }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} — ${text}`);

  const buttons = [
    {
      label: 'Copy link',
      icon: Link2,
      onClick: async () => navigator.clipboard.writeText(url)
    },
    {
      label: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button) =>
        button.href ? (
          <a
            key={button.label}
            href={button.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-green hover:text-brand-green"
          >
            <button.icon className="h-4 w-4" />
            {button.label}
          </a>
        ) : (
          <button
            key={button.label}
            type="button"
            onClick={button.onClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-green hover:text-brand-green"
          >
            <button.icon className="h-4 w-4" />
            {button.label}
          </button>
        )
      )}
    </div>
  );
};

export default ShareButtons;
