
import { useEffect, useState } from 'react';
import { Heart, Send } from 'lucide-react';
import client from '../api/client';
import { formatDateTime, getRoleLabel } from '../utils/helpers';
import Alert from './Alert';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../context/PreferencesContext';

const CommentPanel = ({ targetType, targetId }) => {
  const { isAuthenticated, user } = useAuth();
  const { preferences, t } = usePreferences();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadComments = async () => {
    try {
      setLoading(true);
      const { data } = await client.get('/comments', { params: { targetType, targetId } });
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [targetId, targetType]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!body.trim()) return;

    try {
      setSubmitting(true);
      const { data } = await client.post('/comments', { targetType, targetId, body });
      setComments((current) => [data, ...current]);
      setBody('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = async (commentId) => {
    try {
      const { data } = await client.post(`/comments/${commentId}/like`);
      setComments((current) => current.map((item) => (item._id === commentId ? { ...item, likes: data.likes } : item)));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner label={t('common.loading')} />;

  return (
    <div className="space-y-5">
      {error ? <Alert variant="error">{error}</Alert> : null}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <label className="block text-sm font-medium text-slate-700">{t('programs.leaveComment')}</label>
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={4}
            className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            placeholder="Share a helpful insight, question or reflection."
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Posting…' : t('common.submit')}
            </button>
          </div>
        </form>
      ) : (
        <Alert>Sign in to leave comments and likes.</Alert>
      )}

      {comments.length ? (
        <div className="space-y-4">
          {comments.map((comment) => {
            const liked = comment.likes?.some((item) => item === user?._id || item?._id === user?._id);
            return (
              <article key={comment._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-brand-navy">{comment.author?.name || 'Community member'}</h4>
                    <p className="text-sm text-slate-500">
                      {getRoleLabel(comment.author?.role || 'parent', preferences.language)} · {formatDateTime(comment.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleLike(comment._id)}
                    disabled={!isAuthenticated}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${liked ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}
                  >
                    <Heart className="h-4 w-4" />
                    {comment.likes?.length || 0}
                  </button>
                </div>
                <p className="mt-4 whitespace-pre-line text-slate-700">{comment.body}</p>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState title="No comments yet" description="Start the discussion with the first helpful comment." />
      )}
    </div>
  );
};

export default CommentPanel;
