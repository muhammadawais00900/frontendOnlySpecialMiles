
import { useEffect, useState } from 'react';
import client from '../api/client';

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSiteContent = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await client.get('/site/public');
      setSiteContent(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiteContent();
  }, []);

  return { siteContent, setSiteContent, loading, error, reloadSiteContent: loadSiteContent };
};
