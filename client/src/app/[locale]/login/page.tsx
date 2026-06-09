"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link, useRouter } from "@/i18n/routing"
import { toast } from "sonner"
import { Accessibility, Loader2, ArrowLeft } from "lucide-react"
import { useLoginMutation } from "@/hooks/use-auth"

export default function LoginPage() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const { mutateAsync: login, isPending: isLoading } = useLoginMutation()

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values)
      toast.success("Login successful")
      
      // In a real app we might redirect based on role, but for now redirect to home
      router.push("/")
    } catch (error: any) {
      // Show generic error or message from backend
      toast.error(error.response?.data?.message || "Email hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Accessibility className="h-6 w-6" />
          AccessJobs
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has completely changed how I look for jobs. The accessibility features are incredible and the employers are truly inclusive."
            </p>
            <footer className="text-sm">Sofia Davis - Job Seeker</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <Card className="border-none shadow-none sm:border-solid sm:shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">{t("login")}</CardTitle>
              <CardDescription>
                {t("emailPlaceholder")}
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                      {t("forgotPassword")}
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    autoComplete="current-password"
                    disabled={isLoading} 
                    {...form.register("password")} 
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
                  )}
                </div>
                <Button className="w-full h-11" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t("submitting") : t("loginButton")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center border-t p-6 pb-2">
              <p className="text-center text-sm text-muted-foreground">
                {t("dontHaveAccount")}{" "}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                  {t("registerButton")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
