import Link from "next/link";

type Props = {
  page: number;
  pageCount: number;
};

export default function PaginationFooter({ page, pageCount }: Props) {
  const prev =
    page <= 2 ? "/blog" : `/blog/page/${page - 1}`;
  const next =
    `/blog/page/${page + 1}`;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <nav style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
        {page > 1 ? (
          <Link href={prev}>← Newer</Link>
        ) : (
          <span style={{ opacity: 0.4 }}>← Newer</span>
        )}

        <span>
          Page {page} of {pageCount}
        </span>

        {page < pageCount ? (
          <Link href={next}>Older →</Link>
        ) : (
          <span style={{ opacity: 0.4 }}>Older →</span>
        )}
      </nav>
    </div>
  );
}
