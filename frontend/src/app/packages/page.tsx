import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { BackButton } from "@/components/BackButton"
import { Pagination } from "@/components/Pagination"

import { Package } from "@/lib/types/package"
import { DirectusListResponse } from "@/lib/types/directus"

const PACKAGES_PER_PAGE = 20

async function getPackages(
  page: number
): Promise<DirectusListResponse<Package>> {
  const offset = (page - 1) * PACKAGES_PER_PAGE

  const url = new URL(`${process.env.DIRECTUS_URL}/items/packages`)
  url.searchParams.set("fields", "*")
  url.searchParams.set("limit", String(PACKAGES_PER_PAGE))
  url.searchParams.set("offset", String(offset))
  url.searchParams.set("meta", "filter_count")

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`
    }
  })

  if (!response.ok) {
    throw new Error("Failed to fetch packages")
  }

  const data = (await response.json()) as DirectusListResponse<Package>
  return data
}

export default async function PackagesPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const currentPage = Number(searchParams?.page) || 1

  const response = await getPackages(currentPage)
  const packages = response.data

  const totalCount = response.meta.filter_count ?? 0
  const totalPages = Math.ceil(totalCount / PACKAGES_PER_PAGE)

  return (
    <section className="container mx-auto py-8">
      <BackButton />

      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-4">
        Packages
      </h1>

      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Lessons Quota</TableCell>
            <TableCell>Start Datetime</TableCell>
            <TableCell>End Datetime</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages && packages.length > 0 ? (
            packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>{pkg.id}</TableCell>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.status}</TableCell>
                <TableCell>{pkg.lessons_quota}</TableCell>
                <TableCell>
                  {new Date(pkg.start_datetime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(pkg.end_datetime).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No packages found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/packages"
      />
    </section>
  )
}
