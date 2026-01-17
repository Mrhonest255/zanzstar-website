"use client";

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  socialLinks?: string[];
}

export function OrganizationSchema({
  name,
  url,
  logo,
  phone,
  email,
  address,
  socialLinks = []
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": name,
    "url": url,
    "logo": logo || `${url}/logo.svg`,
    "image": `${url}/og-image.jpg`,
    "description": "Best Zanzibar tours, Tanzania safari packages, Stone Town excursions, and beach holidays. Local experts with best price guarantee.",
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stone Town",
      "addressRegion": "Zanzibar",
      "addressCountry": "Tanzania"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.1622,
      "longitude": 39.1921
    },
    "areaServed": [
      { "@type": "Country", "name": "Tanzania" },
      { "@type": "Place", "name": "Zanzibar" },
      { "@type": "Place", "name": "Serengeti" }
    ],
    "priceRange": "$$",
    "sameAs": socialLinks.filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface TourSchemaProps {
  name: string;
  description: string;
  image: string;
  url: string;
  price: number;
  currency?: string;
  duration: string;
  location: string;
  category: string;
}

export function TourSchema({
  name,
  description,
  image,
  url,
  price,
  currency = "USD",
  duration,
  location,
  category
}: TourSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": name,
    "description": description,
    "image": image,
    "url": url,
    "touristType": category,
    "itinerary": {
      "@type": "ItemList",
      "description": duration
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "ZANZSTAR Tours",
      "url": "https://zanzstartours.com"
    },
    "touristDestination": {
      "@type": "TouristDestination",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Tanzania"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ZANZSTAR Tours",
    "url": "https://zanzstartours.com",
    "description": "Best Zanzibar tours, Tanzania safari packages, and travel experiences",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zanzstartours.com/tours?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
