"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"
import { GovButton } from "@/components/ui/gov-button"
import { Globe } from "lucide-react"

export function LangToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const nextLocale = locale === 'vi' ? 'en' : 'vi'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <GovButton
      size="sm"
      onClick={toggleLocale}
      className="gap-2 px-3 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span className="uppercase">{locale}</span>
    </GovButton>
  )
}
