export default async function sitemap() {
  const baseUrl = "https://auchapel.com/"; 

  // Fetch sermons dynamically
  const sermons = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/sermons/fetch_all.php`
  ).then((res) => res.json());

  const sermonRoutes = sermons.map((s) => ({
    url: `${baseUrl}/sermons/${s.id}`,
    lastModified: s.date || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sermons`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
       {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/give`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...sermonRoutes,
  ];
}
