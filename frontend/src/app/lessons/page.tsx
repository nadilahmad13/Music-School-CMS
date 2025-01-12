import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/BackButton"
import { Pagination } from "@/components/Pagination"
import { Lesson } from "@/lib/types/lesson"
import { DirectusListResponse } from "@/lib/types/directus"

const LESSONS_PER_PAGE = 20

async function getLessons(page: number): Promise<DirectusListResponse<Lesson>> {
  const offset = (page - 1) * LESSONS_PER_PAGE

  const url = new URL(`${process.env.DIRECTUS_URL}/items/lessons`)
  url.searchParams.set("fields", "*,teacher.id,teacher.first_name,teacher.last_name")
  url.searchParams.set("limit", String(LESSONS_PER_PAGE))
  url.searchParams.set("offset", String(offset))
  url.searchParams.set("meta", "filter_count")


  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.DIRECTUS_ADMIN_TOKEN}`
    },
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch lessons")
  }

  const json = (await res.json()) as DirectusListResponse<Lesson>
  return json
}

function getStatusVariant(status: string) {
  switch (status) {
    case "attended":
      return "default"
    case "absent":
      return "destructive"
    default:
      return "secondary"
  }
}

export default async function LessonsPage({
  searchParams
}: {
  searchParams?: { page?: string }
}) {
  const currentPage = Number(searchParams?.page) || 1

  const response = await getLessons(currentPage)
  const lessons = response.data
  const totalCount = response.meta.filter_count ?? 0

  const totalPages = Math.ceil(totalCount / LESSONS_PER_PAGE)

  return (
    <section className="container mx-auto py-8">
      {/* Back button */}
      <BackButton />

      {/* Page title */}
      <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-4">
        Lessons
      </h1>

      {/* Table of lessons */}
      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableCell>ID</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Start Datetime</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Remarks</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.id}</TableCell>
                <TableCell>
                  {lesson.teacher.first_name} {lesson.teacher.last_name}
                </TableCell>
                <TableCell>
                  {new Date(lesson.start_datetime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(lesson.status)}>
                    {lesson.status}
                  </Badge>
                </TableCell>
                <TableCell>{lesson.remarks || "—"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No lessons found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/lessons"
      />
    </section>
  )
}
