
import { useEffect, useState } from 'react';
import client from '../../api/client';
import { useMeta } from '../../hooks/useMeta';
import { usePreferences } from '../../context/PreferencesContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';
import ResourceCard from '../../components/ResourceCard';
import SectionHeader from '../../components/SectionHeader';

const ResourcesPage = () => {
  const { t } = usePreferences();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useMeta({
    title: t('nav.resources'),
    description: 'Search videos, guides, toolkits and articles in the Special Miles resource hub.'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await client.get('/resources');
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <SectionHeader title={t('nav.resources')} description={t('resources.subtitle')} />
      {error ? <Alert variant="error">{error}</Alert> : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => <ResourceCard key={resource._id} resource={resource} portal />)}
      </div>
    </div>
  );
};

export default ResourcesPage;
