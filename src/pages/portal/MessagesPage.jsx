
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { formatDateTime, getRoleLabel } from '../../utils/helpers';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/Alert';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';

const MessagesPage = () => {
  const { t, preferences } = usePreferences();
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [compose, setCompose] = useState({ recipient: '', subject: '', body: '' });
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: t('nav.messages'),
    description: 'Secure messaging between users and administrators in the Special Miles portal.'
  });

  const loadThreads = async () => {
    const { data } = await client.get('/messages/threads');
    setThreads(data);
    return data;
  };

  const loadConversation = async (recipientId) => {
    const { data } = await client.get('/messages', { params: { withUser: recipientId } });
    setMessages(data.map((item) => ({ ...item, isMine: item.sender?._id === user?._id })));
    setSelected(recipientId);
  };

  const loadDirectory = async () => {
    const { data } = await client.get('/users/directory');
    setDirectory(data);
    if (!compose.recipient && data[0]?._id) {
      setCompose((current) => ({ ...current, recipient: data[0]._id }));
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const threadData = await loadThreads();
        await loadDirectory();
        if (threadData[0]?.user?._id) {
          await loadConversation(threadData[0].user._id);
        }
      } catch (err) {
        setFeedback({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      await client.post('/messages', compose);
      setCompose((current) => ({ ...current, body: '', subject: '' }));
      await loadThreads();
      await loadConversation(compose.recipient);
      setFeedback({ type: 'success', message: 'Message sent.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionHeader title={t('nav.messages')} description={t('messages.subtitle')} />
      {feedback ? <Alert variant={feedback.type}>{feedback.message}</Alert> : null}

      <div className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-brand-navy">Conversations</h2>
            <div className="mt-4 space-y-3">
              {threads.length ? threads.map((thread) => (
                <button
                  key={thread.user?._id}
                  type="button"
                  onClick={() => loadConversation(thread.user._id)}
                  className={`block w-full rounded-2xl px-4 py-3 text-left ${selected === thread.user._id ? 'bg-brand-navy text-white' : 'bg-slate-50 text-slate-700'}`}
                >
                  <p className="font-medium">{thread.user?.name}</p>
                  <p className={`mt-1 text-xs ${selected === thread.user._id ? 'text-white/70' : 'text-slate-500'}`}>{thread.latestMessage?.subject || 'General message'}</p>
                </button>
              )) : <EmptyState title="No conversations yet" description="Send a message below to start the conversation." />}
            </div>
          </div>

          <form onSubmit={sendMessage} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold text-brand-navy">{t('messages.newMessage')}</h2>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{t('messages.recipient')}</span>
                <select value={compose.recipient} onChange={(e) => setCompose((c) => ({ ...c, recipient: e.target.value }))} className="input">
                  {directory.map((entry) => (
                    <option key={entry._id} value={entry._id}>
                      {entry.name} · {getRoleLabel(entry.role, preferences.language)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{t('messages.subject')}</span>
                <input value={compose.subject} onChange={(e) => setCompose((c) => ({ ...c, subject: e.target.value }))} className="input" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{t('messages.body')}</span>
                <textarea value={compose.body} onChange={(e) => setCompose((c) => ({ ...c, body: e.target.value }))} rows={6} className="input min-h-[160px]" required />
              </label>
              <button type="submit" className="w-full rounded-2xl bg-brand-green px-4 py-3 font-semibold text-white">
                {t('messages.send')}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-brand-navy">Conversation</h2>
          <div className="mt-5 space-y-4">
            {messages.length ? messages.map((message) => (
              <article key={message._id} className={`max-w-[85%] rounded-3xl px-5 py-4 ${message.isMine ? 'ml-auto bg-brand-navy text-white' : 'bg-slate-50 text-slate-700'}`}>
                {message.subject ? <p className={`text-sm font-semibold ${message.isMine ? 'text-white/80' : 'text-brand-navy'}`}>{message.subject}</p> : null}
                <p className="mt-2 whitespace-pre-line leading-7">{message.body}</p>
                <p className={`mt-3 text-xs ${message.isMine ? 'text-white/70' : 'text-slate-500'}`}>{formatDateTime(message.createdAt)}</p>
              </article>
            )) : <EmptyState title="No messages loaded" description={t('messages.emptyThread')} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
