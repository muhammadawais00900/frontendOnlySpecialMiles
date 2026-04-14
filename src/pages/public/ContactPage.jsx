import { useState } from 'react';
import { useMeta } from '../../hooks/useMeta';
import client from '../../api/client';
import Alert from '../../components/Alert';
import SectionHeader from '../../components/SectionHeader';
import { homeMedia, publicSiteContent } from '../../data/publicContent';

const initialForm = {
  name: '',
  email: '',
  role: 'visitor',
  category: 'general',
  priority: 'medium',
  subject: '',
  message: '',
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useMeta({
    title: 'Contact',
    description:
      'Contact Special Miles for consultations, support, program questions, accessibility requests, partnerships, and implementation enquiries.',
  });

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setFeedback(null);
      await client.post('/tickets/public', form);
      setFeedback({
        type: 'success',
        message: 'Thanks — your message has been submitted and the support team can now action it.',
      });
      setForm(initialForm);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <img src={homeMedia.contact} alt="Contact Special Miles" className="h-64 w-full object-cover" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
          <SectionHeader
            title="Contact"
            description="Use this form for consultations, support, program questions, accessibility requests, partnerships and implementation enquiries."
          />
          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-semibold text-brand-navy">Email:</span> {publicSiteContent.supportEmail}
            </p>
            <p>
              <span className="font-semibold text-brand-navy">Phone:</span> {publicSiteContent.supportPhone}
            </p>
            <div>
              <p className="font-semibold text-brand-navy">Location</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {publicSiteContent.locations.map((location) => (
                  <li key={location}>{location}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input value={form.name} onChange={(e) => updateField('name', e.target.value)} required className="input" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required className="input" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Role</span>
            <select value={form.role} onChange={(e) => updateField('role', e.target.value)} className="input">
              <option value="visitor">Visitor</option>
              <option value="parent">Parent</option>
              <option value="educator">Educator</option>
              <option value="student">Student</option>
              <option value="organisation">Organisation</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="input">
              {['general', 'booking', 'technical', 'billing', 'accessibility', 'program'].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Subject</span>
            <input value={form.subject} onChange={(e) => updateField('subject', e.target.value)} required className="input" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Priority</span>
            <select value={form.priority} onChange={(e) => updateField('priority', e.target.value)} className="input">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-slate-700">Message</span>
          <textarea
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            rows={7}
            required
            className="input min-h-[160px]"
          />
        </label>

        <div className="mt-6 flex justify-end">
          <button
            disabled={submitting}
            type="submit"
            className="rounded-2xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
