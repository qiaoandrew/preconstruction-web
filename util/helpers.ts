import { Listing } from '@/types/types';

export function decode(value: any): any {
  if (value instanceof Array) {
    return value.map((val) => decode(val));
  } else if (value instanceof Object) {
    const newValue: { [key: string]: any } = {};
    for (const [key, val] of Object.entries(value)) {
      newValue[decode(key)] = decode(val);
    }
    return newValue;
  } else {
    return decodeURIComponent(value);
  }
}

export function formatPrice(price: number): string {
  const formattedNumber = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + formattedNumber;
}

export function getTimeAgo(datePosted: string): string {
  const testDate = new Date(datePosted);
  if (isNaN(testDate.getTime())) {
    return 'Sold';
  }

  let timeAgo = Math.floor(
    (new Date().getTime() - new Date(datePosted).getTime()) /
      1000 /
      60 /
      60 /
      24
  );

  if (timeAgo < 1) {
    return 'Today';
  }

  let suffix = ' days ago';

  if (timeAgo == 1) {
    suffix = ' day ago';
  }

  if (timeAgo >= 30) {
    timeAgo = Math.floor(timeAgo / 30);

    if (timeAgo != 1) {
      suffix = ' months ago';
    } else {
      suffix = ' month ago';
    }
  }

  if (timeAgo >= 12) {
    timeAgo = Math.floor(timeAgo / 12);

    if (timeAgo != 1) {
      suffix = ' years ago';
    } else {
      suffix = ' year ago';
    }
  }

  return timeAgo + suffix;
}

export function calculateHiddenClasses(i: number, length: number): string {
  let hiddenClasses = '';

  if (i === length - 1) {
    hiddenClasses += 'hidden ';
  }

  if (length % 2 === 0 && i === length - 2) {
    hiddenClasses += 'sm:hidden ';
  }

  if (length % 3 === 0 && i >= length - 3) {
    hiddenClasses += 'lg:hidden';
  } else if (length % 3 === 1 && i === length - 1) {
    hiddenClasses += 'lg:hidden';
  } else if (length % 3 === 2 && i >= length - 2) {
    hiddenClasses += 'lg:hidden';
  } else {
    hiddenClasses += 'lg:block';
  }

  return hiddenClasses;
}

export function parseListing(unParsedListing: any): Listing {
  return {
    id: unParsedListing.mlsNumber,
    title: `${unParsedListing.address.streetNumber} ${
      unParsedListing.address.streetName
    } ${
      unParsedListing.address.streetSuffix !== 'N/A'
        ? unParsedListing.address.streetSuffix
        : ''
    }`,
    subtitle: `${unParsedListing.address.zip}, ${unParsedListing.address.city}, ${unParsedListing.address.state}`,
    priceString: formatPrice(unParsedListing.listPrice),
    priceLow: unParsedListing.listPrice,
    priceHigh: unParsedListing.listPrice,
    datePosted: unParsedListing.listDate,
    images: unParsedListing.images.map(
      (image: any) => `https://cdn.repliers.io/${image}`
    ),
    longitude: unParsedListing.map.longitude,
    latitude: unParsedListing.map.latitude,
    description: unParsedListing.details.description,
    sqftLow: unParsedListing.details.sqft.includes('+')
      ? unParsedListing.details.sqft.substring(
          0,
          unParsedListing.details.sqft.indexOf('+')
        )
      : unParsedListing.details.sqft.split('-')[0],
    sqftHigh: unParsedListing.details.sqft.includes('+')
      ? unParsedListing.details.sqft.substring(
          unParsedListing.details.sqft.indexOf('+')
        )
      : unParsedListing.details.sqft.split('-')[1],
    bathrooms: unParsedListing.details.numBathrooms,
    bedrooms: unParsedListing.details.numBedrooms,
    parking: unParsedListing.details.numParkingSpaces,
    tables: [
      {
        title: 'Location',
        keyValueData: {
          'City': unParsedListing.address.city,
          'State': unParsedListing.address.state,
          'Zip Code': unParsedListing.address.zip,
          'Major Intersection': unParsedListing.address.majorIntersection,
          'Neighborhood': unParsedListing.address.neighborhood,
        },
      },
      {
        title: 'Property Details',
        keyValueData: {
          'Kitchens': unParsedListing.details.numKitchens,
          'Bathrooms': unParsedListing.details.numBathrooms,
          'Bedrooms': unParsedListing.details.numBedrooms,
          'Parking Spaces': unParsedListing.details.numParkingSpaces,
          'Property Type': unParsedListing.details.propertyType,
          'Size (SQFT)': unParsedListing.details.sqft,
        },
      },
    ],
  };
}

export function changeGoogleDriveURL(url: string) {
  return `https://drive.google.com/uc?export=view&id=${url.substring(
    url.indexOf('/d/') + 3,
    url.indexOf('/view')
  )}`;
}
