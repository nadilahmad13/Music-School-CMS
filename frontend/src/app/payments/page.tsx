import { Payment } from "@/lib/types/payment"
import { DirectusListResponse } from "@/lib/types/directus"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { BackButton } from "@/components/BackButton"
import { Pagination } from "@/components/Pagination"

const PAYMENTS_PER_PAGE = 20

async function getPayments(
  page: number = 1
): Promise<DirectusListResponse<Payment>> {
  const offset = (page - 1) * PAYMENTS_PER_PAGE

  const url = new URL(`${process.env.DIRECTUS_URL}/items/payments`)
  url.searchParams.set("limit", String(PAYMENTS_PER_PAGE))
  url.searchParams.set("offset", String(offset))
  url.searchParams.set("meta", "filter_count")

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`
    }
  })

  if (!response.ok) {
    throw new Error("Failed to fetch payments")
  }

  const data = (await response.json()) as DirectusListResponse<Payment>
  return data
}

export default async function PaymentsPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const currentPage = Number(searchParams?.page) || 1

  const response = await getPayments(currentPage)
  const payments = response.data

  const totalCount = response.meta.filter_count ?? 0
  const totalPages = Math.ceil(totalCount / PAYMENTS_PER_PAGE)

  return (
    <section className="container mx-auto py-8">
      <BackButton />

      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-4">
        Payments
      </h1>

      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableCell>ID</TableCell>
            <TableCell>Payment ID</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Package</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments && payments.length ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.payment_id}</TableCell>
                <TableCell>{payment.currency}</TableCell>
                <TableCell>{payment.rate}</TableCell>
                <TableCell>
                  {new Date(payment.payment_date).toLocaleString()}
                </TableCell>
                <TableCell>{payment.package}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No payments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/payments"
      />
    </section>
  )
}
