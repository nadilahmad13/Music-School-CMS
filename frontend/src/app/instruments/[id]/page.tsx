import { notFound } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Instrument } from "@/lib/types/instrument"
import { DirectusSingleResponse } from "@/lib/types/directus"
import { BackButton } from "@/components/BackButton"

async function getInstrumentDetail(id: string): Promise<Instrument | null> {
  const url = new URL(`${process.env.DIRECTUS_URL}/items/instruments/${id}`)
  url.searchParams.set(
    "fields",
    "*,students.students_id.*,teachers.teachers_id.*"
  )

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`
    }
  })

  if (!response.ok) {
    return null
  }

  const data: DirectusSingleResponse<Instrument> = await response.json()

  return data.data
}

export default async function InstrumentDetailPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

  const instrument = await getInstrumentDetail(id)

  if (!instrument) {
    notFound()
  }

  return (
    <section className="container mx-auto py-8">
      <BackButton href="/instruments" text="Back to Instruments" />

      <h1 className="text-2xl font-bold mb-4">{instrument.name}</h1>

      {/* Students Table */}
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Students Table */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl font-semibold mb-2">Students</h2>
          <Table>
            <TableHeader>
              <TableRow className="font-semibold">
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instrument.students?.length ? (
                instrument.students.map((student) => (
                  <TableRow key={student.students_id.id}>
                    <TableCell>
                      {student.students_id.first_name}{" "}
                      {student.students_id.last_name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>No students found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Teachers Table */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-xl font-semibold mb-2">Teachers</h2>
          <Table>
            <TableHeader>
              <TableRow className="font-semibold">
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instrument.teachers?.length ? (
                instrument.teachers.map((teacher) => (
                  <TableRow key={teacher.teachers_id.id}>
                    <TableCell>
                      {teacher.teachers_id.first_name}{" "}
                      {teacher.teachers_id.last_name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>No teachers found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
