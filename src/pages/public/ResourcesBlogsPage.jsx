import { useEffect, useMemo, useState } from "react";
import client from "../../api/client";
import { useMeta } from "../../hooks/useMeta";
import LoadingSpinner from "../../components/LoadingSpinner";
import ResourceCard from "../../components/ResourceCard";
import SectionHeader from "../../components/SectionHeader";

const blogTypes = new Set(["Article", "Guide"]);

const ResourcesBlogsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useMeta({
    title: "Resources + Blogs",
    description:
      "Explore Special Miles resources, guides, articles and blog-style content.",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await client.get("/resources");
        setItems(data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const blogs = useMemo(
    () => items.filter((item) => blogTypes.has(item.type)),
    [items],
  );
  const resources = useMemo(
    () => items.filter((item) => !blogTypes.has(item.type)),
    [items],
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <SectionHeader
        title="Resources + Blogs"
        description="Browse toolkits, worksheets, videos, guides and blog-style articles in one place."
      />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-brand-navy">Resources</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brand-navy">Blogs</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesBlogsPage;
