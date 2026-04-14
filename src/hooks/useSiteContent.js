import { useEffect, useState } from 'react';
import client from '../api/client';
import { publicSiteContent, recognitionHighlights } from '../data/publicContent';

const fallbackSiteContent = {
  ...publicSiteContent,
  awards: recognitionHighlights,
  faqs: [],
  announcement: '',
};

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState(fallbackSiteContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSiteContent = async () => {
    try {
      setError('');
      const { data } = await client.get('/site/public');
      const merged = {
        ...fallbackSiteContent,
        ...(data || {}),
        socialLinks: {
          ...fallbackSiteContent.socialLinks,
          ...(data?.socialLinks || {}),
        },
        awards: data?.awards?.length ? data.awards : fallbackSiteContent.awards,
        locations: data?.locations?.length ? data.locations : fallbackSiteContent.locations,
      };
      setSiteContent(merged);
      return merged;
    } catch (err) {
      setError(err.message);
      setSiteContent(fallbackSiteContent);
      return fallbackSiteContent;
    }
  };

  useEffect(() => {
    loadSiteContent();
  }, []);

  return {
    siteContent,
    setSiteContent,
    loading,
    error,
    reloadSiteContent: loadSiteContent,
  };
};
