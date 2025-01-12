import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href?: string
  text?: string
}

export function BackButton({
  href = "/",
  text = "Back to home"
}: BackButtonProps) {
  return (
    <Link href={href}>
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {text}
      </Button>
    </Link>
  )
}
