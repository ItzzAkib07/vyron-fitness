import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "VYRON Fitness — Next-Gen 3D Athletic Club & Performance Tech",
  description = "Experience VYRON Fitness. A high-performance luxury athletic club engineered with sports science, bio-metrics, master coaching, and elite training environments.",
  canonical = "https://vyronfitness.com/",
  image = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
  type = "website",
  schema = null
}) {
  const siteTitle = title.includes("VYRON") ? title : `${title} | VYRON Fitness`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "VYRON Fitness",
    "image": image,
    "description": description,
    "url": canonical,
    "telephone": "+91-98765-43210",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Apex Velocity Tower, Baner Road, Baner",
      "addressLocality": "Pune",
      "addressRegion": "MH",
      "postalCode": "411045",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5590",
      "longitude": "73.7868"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ]
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="VYRON Fitness" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
