import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

interface DashboardCardProps {
  href: string
  title: string
  description: string
}

export function DashboardCard({
  href,
  title,
  description
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className="transition-transform hover:scale-105 cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
