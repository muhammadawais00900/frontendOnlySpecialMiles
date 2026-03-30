
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import SectionHeader from '../../components/SectionHeader';

const contentMap = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'Special Miles collects only the personal information needed to deliver programs, bookings, messaging, support tickets and platform security.',
      'Profile information, learning data, bookings, comments and support interactions are stored securely and used to personalise services and improve operations.',
      'Users can request updates to their information, and administrators are expected to handle access, retention and disclosure in line with applicable privacy obligations.'
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      'By using the platform, users agree to provide accurate account information and to use the portal respectfully and lawfully.',
      'Program resources and content remain the property of Special Miles unless otherwise stated and must not be redistributed without permission.',
      'Administrators may moderate content, manage access and suspend accounts where misuse, safety or policy concerns arise.'
    ]
  },
  refund: {
    title: 'Refund Policy',
    body: [
      'Refund eligibility depends on the nature of the booking, subscription or institutional arrangement.',
      'Requests should be submitted through the support form with relevant booking details so the team can assess the situation fairly.',
      'Where a payment has been simulated for the MVP, the platform still records workflow status to support future live payment integrations.'
    ]
  }
};

const PoliciesPage = () => {
  const { t } = usePreferences();
  const { policyType } = useParams();
  const location = useLocation();
  const resolvedType = policyType || location.pathname.replace('/', '') || 'privacy';
  const content = useMemo(() => contentMap[resolvedType] || contentMap.privacy, [resolvedType]);

  useMeta({
    title: content.title,
    description: `${content.title} for the Special Miles digital platform.`
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <SectionHeader title={content.title} description="This policy page is written so it can be expanded by the client into a final legal version before public launch." />
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <div className="space-y-6 text-slate-700">
          {content.body.map((paragraph) => (
            <p key={paragraph} className="leading-8">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
