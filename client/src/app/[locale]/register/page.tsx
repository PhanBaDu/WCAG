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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, useRouter } from "@/i18n/routing"
import { toast } from "sonner"
import { Accessibility, Loader2, ArrowLeft } from "lucide-react"
import { useRegisterMutation } from "@/hooks/use-auth"

export default function RegisterPage() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const { mutateAsync: register, isPending: isLoading } = useRegisterMutation()

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Must contain uppercase, lowercase, number, and special character"),
    confirmPassword: z.string(),
    role: z.enum(["NKT", "NTD"]),
    fullName: z.string().optional(),
    companyName: z.string().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }).refine((data) => {
    if (data.role === "NKT") return !!data.fullName && data.fullName.length >= 2;
    return true;
  }, {
    message: "Full name is required",
    path: ["fullName"]
  }).refine((data) => {
    if (data.role === "NTD") return !!data.companyName && data.companyName.length >= 2;
    return true;
  }, {
    message: "Company name is required",
    path: ["companyName"]
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "NKT",
      fullName: "",
      companyName: "",
    },
  })

  const selectedRole = form.watch("role")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register({
        email: values.email,
        password: values.password,
        role: values.role,
        fullName: values.fullName,
        companyName: values.companyName
      })
      toast.success("Vui lòng kiểm tra email để xác thực tài khoản")
      router.push("/login")
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Email này đã được sử dụng")
      } else {
        toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký")
      }
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 py-10 lg:py-0">
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
              "Building an inclusive workforce isn't just about doing the right thing, it's about finding the best talent. This platform makes it possible."
            </p>
            <footer className="text-sm">TechCorp Inc. - Inclusive Employer</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <Card className="border-none shadow-none sm:border-solid sm:shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">{t("register")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">{t("role")}</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("role", value as "NKT" | "NTD")} 
                    defaultValue={form.watch("role")} 
                    disabled={isLoading}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NKT">{t("roleNKT")}</SelectItem>
                      <SelectItem value="NTD">{t("roleNTD")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.role.message}</p>
                  )}
                </div>

                {selectedRole === "NKT" ? (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("fullName")}</Label>
                    <Input id="fullName" placeholder={t("fullNamePlaceholder")} autoComplete="name" disabled={isLoading} {...form.register("fullName")} />
                    {form.formState.errors.fullName && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t("companyName")}</Label>
                    <Input id="companyName" placeholder={t("companyNamePlaceholder")} autoComplete="organization" disabled={isLoading} {...form.register("companyName")} />
                    {form.formState.errors.companyName && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" placeholder="name@example.com" autoComplete="email" disabled={isLoading} {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Input id="password" type="password" placeholder="••••••••" autoComplete="new-password" disabled={isLoading} {...form.register("password")} />
                    {form.formState.errors.password && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" autoComplete="new-password" disabled={isLoading} {...form.register("confirmPassword")} />
                    {form.formState.errors.confirmPassword && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <Button className="w-full h-11 mt-4" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t("submitting") : t("registerButton")}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center border-t p-6 pb-2">
              <p className="text-center text-sm text-muted-foreground">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  {t("loginButton")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
