//This component gonna handle the results count, remember in the API I've set a limit of 25 results per page.
"use client";

interface ResultsCountProps {
  total: number;
  searchQuery?: string;
  genre?: string;
}
// My component
export default function ResultsCount({
  total,
  searchQuery,
  genre,
}: ResultsCountProps) {
  const hasFilters = searchQuery || genre;

  return (
    <div className="flex items-center gap-3 text-zinc-400">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-white">
          {total.toLocaleString()}
        </span>
        <span className="text-lg">{total === 1 ? "result" : "results"}</span>
      </div>

      {hasFilters && (
        <>
          <span className="text-zinc-700">•</span>
          <div className="text-sm">
            {searchQuery && (
              <span>
                for{" "}
                <span className="text-amber-500 font-semibold">
                  {searchQuery}
                </span>
              </span>
            )}
            {searchQuery && genre && <span className="mx-1">in</span>}
            {genre && (
              <span>
                <span className="text-amber-500 font-semibold">{genre}</span>
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
