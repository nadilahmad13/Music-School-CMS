import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button" // Assuming you're using shadcn/ui button
import { BackButton } from "@/components/BackButton"

import { Instrument } from "@/lib/types/instrument"

import { DirectusCollectionResponse } from "@/lib/types/directus"

async function getInstruments(): Promise<Instrument[]> {
  const url = new URL(`${process.env.DIRECTUS_URL}/items/instruments`)
  url.searchParams.set("limit", "-1")

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`
    }
  })

  if (!response.ok) {
    throw new Error("Failed to fetch instruments")
  }

  const data: DirectusCollectionResponse<Instrument> = await response.json()
  return data.data
}

export default async function InstrumentsListPage() {
  const instruments = await getInstruments()

  return (
    <section className="container mx-auto py-8">
      <BackButton href="/" text="Back to Home" />
      <h1 className="text-2xl font-bold mb-4">Instruments</h1>

      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableCell>ID</TableCell>
            <TableCell>Instrument Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instruments.length > 0 ? (
            instruments.map((instrument) => (
              <TableRow key={instrument.id}>
                <TableCell>{instrument.id}</TableCell>
                <TableCell>{instrument.name}</TableCell>
                <TableCell>
                  <Link href={`/instruments/${instrument.id}`}>
                    <Button variant="outline">See Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No instruments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
