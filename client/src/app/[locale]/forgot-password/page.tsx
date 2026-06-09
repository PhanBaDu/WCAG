"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useRouter } from "@/i18n/routing"
import { toast } from "sonner"
import { Loader2, ArrowLeft, MailCheck } from "lucide-react"
import { useForgotPasswordMutation } from "@/hooks/use-auth"

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const { mutateAsync: forgotPassword, isPending: isLoading } = useForgotPasswordMutation()
  const [isSent, setIsSent] = React.useState(false)

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await forgotPassword(values.email)
      setIsSent(true)
      toast.success("Đã gửi email khôi phục mật khẩu")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi")
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Link
        href="/login"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToLogin")}
      </Link>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        {isSent ? (
          <Card className="border-none shadow-none sm:border-solid sm:shadow-sm text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <MailCheck className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Check your email</CardTitle>
              <CardDescription className="text-base">
                We have sent a password recover link to <strong>{form.getValues().email}</strong>.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full h-11" variant="outline" onClick={() => router.push("/login")}>
                {t("backToLogin")}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-none shadow-none sm:border-solid sm:shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">{t("forgotPasswordTitle")}</CardTitle>
              <CardDescription>
                {t("forgotPasswordDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input 
                    id="email"
                    placeholder="name@example.com" 
                    autoComplete="email" 
                    disabled={isLoading} 
                    {...form.register("email")} 
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <Button className="w-full h-11" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t("submitting") : t("sendResetLink")}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
