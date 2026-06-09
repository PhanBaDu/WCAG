"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "@/i18n/routing"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useResetPasswordMutation } from "@/hooks/use-auth"
import { useSearchParams } from "next/navigation"

function ResetPasswordForm() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const { mutateAsync: resetPassword, isPending: isLoading } = useResetPasswordMutation()

  const formSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Must contain uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Invalid or missing reset token")
      return
    }

    try {
      await resetPassword({ token, newPassword: values.password })
      toast.success("Mật khẩu đã được thay đổi thành công")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi")
    }
  }

  if (!token) {
    return (
      <div className="container flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Invalid Request</h1>
          <p className="text-muted-foreground mb-6">No reset token found in the URL.</p>
          <Button onClick={() => router.push("/login")}>{t("backToLogin")}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <Card className="border-none shadow-none sm:border-solid sm:shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">{t("resetPasswordTitle")}</CardTitle>
            <CardDescription>
              {t("resetPasswordDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t("newPassword")}</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="new-password"
                  disabled={isLoading} 
                  {...form.register("password")} 
                />
                {form.formState.errors.password && (
                  <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="new-password"
                  disabled={isLoading} 
                  {...form.register("confirmPassword")} 
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm font-medium text-destructive">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <Button className="w-full h-11 mt-4" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? t("submitting") : t("resetPasswordButton")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ResetPasswordForm />
    </React.Suspense>
  )
}
