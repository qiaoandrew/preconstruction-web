import useRecommendations from '@/hooks/useRecommendations';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function ForSale() {
  const router = useRouter();
  const { query } = router.query;

  const [searchQuery, setSearchQuery] = useState((query as string) || '');
  const [showFilter, setShowFilter] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [filterValues, setFilterValues] = useState<any>({
    price: [0, 10000000],
    bedrooms: new Set(),
    bathrooms: new Set(),
    size: [0, 10000],
    parking: new Set(),
  });

  const listingsContainerRef = useRef<HTMLDivElement>(null);

  const recommendations = useRecommendations(
    'sale',
    searchQuery,
    pageNum,
    12,
    filterValues
  );
}
