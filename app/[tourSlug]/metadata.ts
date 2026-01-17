import { Metadata } from "next";
import { tours } from "@/lib/tours";

// Generate static params for all tour pages
export async function generateStaticParams() {
  return tours.map((tour) => ({
    tourSlug: tour.slug,
  }));
}

// Generate metadata for each tour page
export async function generateMetadata({ params }: { params: { tourSlug: string } }): Promise<Metadata> {
  const tour = tours.find(t => t.slug === params.tourSlug);

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The requested tour could not be found.",
    };
  }

  const priceNumber = parseInt(tour.price.replace(/[^0-9]/g, '')) || 0;

  return {
    title: `${tour.title} | Book Now from $${priceNumber}`,
    description: `${tour.description.slice(0, 155)}... Book your ${tour.title} in Zanzibar. Duration: ${tour.duration}. Starting from $${priceNumber}.`,
    keywords: [
      tour.title,
      `${tour.category} tour Zanzibar`,
      tour.location,
      "Zanzibar tours",
      "Tanzania tours",
      `${tour.title.toLowerCase()} price`,
      `book ${tour.title.toLowerCase()}`
    ],
    openGraph: {
      title: `${tour.title} | ZANZSTAR Tours`,
      description: tour.description.slice(0, 200),
      url: `https://zanzstartours.com/${tour.slug}`,
      siteName: "ZANZSTAR Tours",
      images: [
        {
          url: tour.headerImage,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.title} | ZANZSTAR Tours`,
      description: tour.description.slice(0, 200),
      images: [tour.headerImage],
    },
    alternates: {
      canonical: `https://zanzstartours.com/${tour.slug}`,
    },
  };
}
