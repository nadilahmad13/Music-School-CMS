import { DashboardCard } from "@/components/DashboardCard"

export default function HomePage() {
  return (
    <section className="container mx-auto py-8">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-6 text-center">
        Welcome to the Music School Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Instruments Card */}
        <DashboardCard
          title="Instruments"
          description="View and manage the list of instruments"
          href="/instruments"
        />

        {/* Packages Card */}
        <DashboardCard
          title="Packages"
          description="Browse or manage lesson packages"
          href="/packages"
        />

        {/* Payments Card */}
        <DashboardCard
          title="Payments"
          description="Manage student payments and invoices"
          href="/payments"
        />

        {/* Lessons Card */}
        <DashboardCard
          title="Lessons"
          description="View and manage lesson schedules"
          href="/lessons"
        />
      </div>
    </section>
  )
}
