import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const usePagination = (initialPage = 1) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [location]);

  const updatePage = (page) => {
    setCurrentPage(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page);
    navigate({ search: searchParams.toString() });
  };

  return { currentPage, updatePage };
};

export default usePagination;
