import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { PaginationProps } from "@/lib/types/pagination"

export function Pagination({
  currentPage,
  totalPages,
  basePath
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Previous Button */}
      <Link
        href={{
          pathname: basePath,
          query: { page: currentPage - 1 }
        }}
        prefetch={false}
      >
        <Button variant="outline" disabled={currentPage <= 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      </Link>

      {/* Page Info */}
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Link
        href={{
          pathname: basePath,
          query: { page: currentPage + 1 }
        }}
        prefetch={false}
      >
        <Button variant="outline" disabled={currentPage >= totalPages}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
