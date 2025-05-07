interface Props {
  page: number;
  pageSizeOptions: number[];
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const Paginate = ({
  page,
  pageSizeOptions,
  totalPages,
  setPage,
  setPageSize,
}: Props) => {
  return (
    <div>
      <select onChange={(e) => setPageSize(parseInt(e.target.value))}>
        {pageSizeOptions.map((val, key) => (
          <option value={val} key={key}>
            {val}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary btn-sm m-3"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <span>
        Showing {page}/{totalPages}
      </span>
      <button
        className="btn btn-primary btn-sm m-3"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
