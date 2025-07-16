import merge from 'lodash.merge';
import type { Metadata, ResolvingMetadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
};

type CreateMetadataParams = {
  title: string;
  description: string;
  keywords: string[];
  images: string[];
};

const applicationName = 'Finna';
const authors = [{
  name: 'Finna',
  url: 'https://blogui.me/heredialucas',
}];
const creator = 'Lucas Heredia';
const publisher = 'Finna';
const twitterHandle = '@finna';

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: authors,
    creator: creator,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
    icons: {
      icon: [
        { url: '/logo.png', type: 'image/png' }
      ],
      shortcut: '/logo.png',
      apple: [
        { url: '/logo.png' }
      ],
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
