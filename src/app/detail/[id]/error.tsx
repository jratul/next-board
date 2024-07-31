"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <h2>Error</h2>
      <p>{error.digest}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </>
  );
}
