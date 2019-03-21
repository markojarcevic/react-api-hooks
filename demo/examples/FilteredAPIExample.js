import React from 'react';
import useAPI from '../../src/useAPI';
import BooksList from '../components/BookList';
import { Error, Loading } from '../components/Status';
import { API_URL } from '../constants';
import useParams from '../../src/useParams';
import Paginator from '../components/Paginator';
import SearchInput from '../components/SearchInput';

const pageSize = 5;

const FilteredAPIExample = () => {
  const { params, updateParams, debouncedUpdateParams, isStale } = useParams({
    q: 'intitle:Guide to the Galaxy',
    startIndex: 0,
    maxResults: pageSize
  });
  const { data, error, isLoading } = useAPI(API_URL, { params });

  if (error) {
    return <Error />;
  }

  return (
    <>
      <SearchInput
        defaultValue="Guide to the Galaxy"
        onChange={e =>
          debouncedUpdateParams({
            q: `intitle:${e.target.value}`,
            startIndex: 0
          })
        }
      />
      <div className="book-list-outer">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <BooksList data={data} isStale={isStale} />
            <Paginator
              isNext={data ? data.items.length === pageSize : false}
              isPrev={params.startIndex > 0}
              onNext={() => updateParams({ startIndex: params.startIndex + pageSize })}
              onPrev={() => updateParams({ startIndex: params.startIndex - pageSize })}
            />
          </>
        )}
      </div>
    </>
  );
};

export default FilteredAPIExample;