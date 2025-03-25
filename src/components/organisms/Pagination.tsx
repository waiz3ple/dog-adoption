import { SearchParams } from '../../api/types/dogTypes';
import { Button } from '../atoms/Button';

interface PaginationProps {
  params: SearchParams;
  searchResults: { total: number } | undefined;
  showFavoritesOnly: boolean;
  isFetching: boolean;
  handleFilterChange: (key: keyof SearchParams, value: any) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  params,
  searchResults,
  showFavoritesOnly,
  isFetching,
  handleFilterChange,
}) => {
  const totalPages = Math.ceil((searchResults?.total || 0) / (params.size || 1));
  const currentPage = Math.floor((params.from || 0) / (params.size || 1)) + 1;
  const isLastPage = currentPage >= totalPages;

  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <Button
            key={i}
            onClick={() => handleFilterChange('from', (i - 1) * (params.size || 1))}
            variant={currentPage === i ? 'primary' : 'outline'}
            className="rounded-full w-12 h-12 flex items-center justify-center text-base"
          >
            {i}
          </Button>
        );
      }
    } else {
      items.push(
        <Button
          key={1}
          onClick={() => handleFilterChange('from', 0)}
          variant={currentPage === 1 ? 'primary' : 'outline'}
          className="rounded-full w-12 h-12 flex items-center justify-center text-base"
        >
          1
        </Button>
      );
      if (currentPage > 3) items.push(<span key="start-ellipsis" className="mx-2">...</span>);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        items.push(
          <Button
            key={i}
            onClick={() => handleFilterChange('from', (i - 1) * (params.size || 1))}
            variant={currentPage === i ? 'primary' : 'outline'}
            className="rounded-full w-12 h-12 flex items-center justify-center text-base"
          >
            {i}
          </Button>
        );
      }
      if (currentPage < totalPages - 2)
        items.push(<span key="end-ellipsis" className="mx-2">...</span>);
      items.push(
        <Button
          key={totalPages}
          onClick={() => handleFilterChange('from', (totalPages - 1) * (params.size || 1))}
          variant={currentPage === totalPages ? 'primary' : 'outline'}
          className="rounded-full w-12 h-12 flex items-center justify-center text-base"
        >
          {totalPages}
        </Button>
      );
    }
    return items;
  };

  return (
    <>
      {!showFavoritesOnly && (searchResults?.total ?? 0) > 0 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <Button
            onClick={() =>
              handleFilterChange('from', Math.max(0, (params.from || 0) - (params.size || 1)))
            }
            disabled={params.from === 0}
            variant="outline"
            className="rounded-full w-12 h-12 flex items-center justify-center text-base"
          >
            &lt;
          </Button>
          {getPaginationItems()}
          <Button
            onClick={() => handleFilterChange('from', (params.from || 0) + (params.size || 1))}
            disabled={isLastPage}
            variant="outline"
            className="rounded-full w-12 h-12 flex items-center justify-center text-base"
          >
            &gt;
          </Button>
        </div>
      )}
      {isFetching && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">Fetching...</p>
      )}
    </>
  );
};