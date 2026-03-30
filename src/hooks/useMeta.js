
import { useEffect } from 'react';

export const useMeta = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Special Miles`;
    }
    if (description) {
      let element = document.querySelector('meta[name="description"]');
      if (!element) {
        element = document.createElement('meta');
        element.name = 'description';
        document.head.appendChild(element);
      }
      element.content = description;
    }
  }, [title, description]);
};
