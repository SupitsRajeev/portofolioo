import type { Metadata } from "next";

export const siteConfig = {
  name: "3D Design & Animation Portfolio",
  description:
    "Professional 3D design and animation services. Specializing in character design, motion graphics, interactive visualizations, and brand animation.",
  author: "Rajeev Neupane",
  siteUrl: "https://yourportfolio.com",
  twitterHandle: "@yourhandle",
  email: "contact@yourportfolio.com",
  phone: "+1 (555) 000-0000",
  location: {
    city: "Kathmandu",
    country: "Nepal",
    address: "Your Address Here",
  },
};

export function generateMetadata(params: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
}): Metadata {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    image = `${siteConfig.siteUrl}/opengraph.jpg`,
    url = siteConfig.siteUrl,
    noindex = false,
  } = params;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    keywords: [
      "3D design",
      "animation",
      "motion graphics",
      "character design",
      "interactive visualization",
      "brand animation",
      "web 3D",
      "Three.js",
      "creative technologist",
      "freelance designer",
      "portfolio",
    ],
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateStructuredData(type: "Organization" | "Person" | "Service" | "BlogPosting" | "Article", data: any) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
  };

  const structures: Record<string, any> = {
    Organization: {
      ...baseStructure,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/logo.png`,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.location.address,
        addressCity: siteConfig.location.city,
        addressCountry: siteConfig.location.country,
      },
      sameAs: [
        "https://linkedin.com/in/yourprofile",
        "https://twitter.com/yourhandle",
        "https://github.com/yourprofile",
        "https://dribbble.com/yourprofile",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: siteConfig.email,
      },
    },
    Person: {
      ...baseStructure,
      name: siteConfig.author,
      url: siteConfig.siteUrl,
      email: siteConfig.email,
      jobTitle: "3D Designer & Motion Graphics Artist",
      affiliation: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    Service: {
      ...baseStructure,
      name: data.title,
      description: data.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: data.price || "Contact for pricing",
      },
    },
    BlogPosting: {
      ...baseStructure,
      headline: data.title,
      description: data.excerpt,
      image: data.coverImage,
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      author: {
        "@type": "Person",
        name: data.author || siteConfig.author,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: `${siteConfig.siteUrl}/logo.png`,
      },
    },
    Article: {
      ...baseStructure,
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.publishedAt,
      author: {
        "@type": "Person",
        name: siteConfig.author,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  return structures[type] || baseStructure;
}
