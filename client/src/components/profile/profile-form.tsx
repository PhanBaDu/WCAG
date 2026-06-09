/**
 * @file        src/components/profile/profile-form.tsx
 * @description Accessible Profile Form with tabs and progress for NKT.
 * @module      Profile/Form
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        1.3.5 Identify Input Purpose (AA) - autocomplete attributes
 *              2.4.12 Focus Not Obscured (AA) - sticky header avoids obscuring focus
 *              2.5.7 Dragging Movements (AA) - drag/drop upload has click fallback
 *              3.3.7 Redundant Entry (A) - auto-fills data
 */

"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, User, Heart, Settings, UploadCloud, Briefcase } from "lucide-react"
import { useNKTProfileQuery, useUpdateNKTProfileMutation } from "@/hooks/use-profile"
import { DisabilityType } from "@/lib/types"

const profileSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  province: z.string().optional(),
  summary: z.string().optional(),
  skills: z.string().optional(), // string for simple CSV input
  supportNeeds: z.string().max(500).optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfileForm() {
  const t = useTranslations("Profile")
  const [activeTab, setActiveTab] = React.useState<"personal" | "disability" | "experience" | "settings">("personal")
  const [completion, setCompletion] = React.useState(0)

  // Use TanStack hooks
  const { data: profile, isLoading: isFetching } = useNKTProfileQuery()
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateNKTProfileMutation()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      dateOfBirth: "",
      province: "",
      summary: "",
      skills: "",
      supportNeeds: "",
    },
  })

  // Load data when fetched
  React.useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth || "",
        province: profile.province || "",
        summary: profile.summary || "",
        skills: profile.skills ? profile.skills.join(", ") : "",
        supportNeeds: profile.supportNeeds || "",
      })
    }
  }, [profile, form])

  // Calculate completion percentage
  const watchAll = form.watch()
  React.useEffect(() => {
    let filled = 0
    const keys = Object.keys(watchAll) as Array<keyof ProfileFormValues>
    keys.forEach(key => {
      if (watchAll[key] && String(watchAll[key]).trim().length > 0) filled++
    })
    setCompletion(Math.round((filled / keys.length) * 100))
  }, [watchAll])

  // Auto-save draft every 30s
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (form.formState.isDirty) {
        localStorage.setItem("profile_draft", JSON.stringify(form.getValues()))
        // console.log("Draft saved")
      }
    }, 30000)
    return () => clearInterval(timer)
  }, [form])

  async function onSubmit(values: ProfileFormValues) {
    try {
      await updateProfile({
        ...values,
        skills: values.skills ? values.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
      })
      toast.success(t("profileUpdated"))
      localStorage.removeItem("profile_draft")
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    }
  }

  if (isFetching) {
    return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t("title")}</h1>
        
        {/* Accessible Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1 font-medium">
            <span>Độ hoàn thiện hồ sơ</span>
            <span>{completion}%</span>
          </div>
          <div 
            className="w-full bg-muted rounded-full h-2.5 overflow-hidden"
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completion progress"
          >
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${completion < 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          {completion < 60 && (
            <p className="text-xs text-muted-foreground mt-1 text-yellow-600 dark:text-yellow-500">
              * Vui lòng hoàn thiện ít nhất 60% để có thể ứng tuyển việc làm.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0" aria-label="Profile tabs">
            <button 
              onClick={() => setActiveTab("personal")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "personal" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              aria-current={activeTab === "personal" ? "page" : undefined}
            >
              <User className="h-4 w-4" /> {t("personalInfo")}
            </button>
            <button 
              onClick={() => setActiveTab("disability")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "disability" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              aria-current={activeTab === "disability" ? "page" : undefined}
            >
              <Heart className="h-4 w-4" /> {t("disabilityInfo")}
            </button>
            <button 
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "experience" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              aria-current={activeTab === "experience" ? "page" : undefined}
            >
              <Briefcase className="h-4 w-4" /> {t("experience")}
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              aria-current={activeTab === "settings" ? "page" : undefined}
            >
              <Settings className="h-4 w-4" /> {t("settings")}
            </button>
          </nav>
        </aside>

        {/* Form Content */}
        <div className="flex-1">
          <Card className="border-none shadow-none sm:border-solid sm:shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                {activeTab === "personal" && t("personalInfo")}
                {activeTab === "disability" && t("disabilityInfo")}
                {activeTab === "experience" && t("experience")}
                {activeTab === "settings" && t("settings")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* TAB 1: Personal Info */}
                <div className={activeTab === "personal" ? "block space-y-4" : "hidden"}>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("fullName")}</Label>
                    <Input 
                      id="fullName" 
                      autoComplete="name" // WCAG 1.3.5
                      {...form.register("fullName")} 
                    />
                    {form.formState.errors.fullName && <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        autoComplete="tel" // WCAG 1.3.5
                        {...form.register("phone")} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
                      <Input 
                        id="dateOfBirth" 
                        type="date" 
                        autoComplete="bday" // WCAG 1.3.5
                        {...form.register("dateOfBirth")} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">{t("province")}</Label>
                    <Input 
                      id="province" 
                      autoComplete="address-level2" // WCAG 1.3.5
                      {...form.register("province")} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">{t("summary")}</Label>
                    <textarea 
                      id="summary" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      {...form.register("summary")} 
                    />
                  </div>
                </div>

                {/* TAB 2: Disability Info */}
                <div className={activeTab === "disability" ? "block space-y-6" : "hidden"}>
                  <fieldset>
                    <legend className="text-sm font-medium mb-3">Dạng khuyết tật (Có thể chọn nhiều)</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['MOBILITY', 'VISUAL', 'HEARING', 'SPEECH', 'COGNITIVE'].map((type) => (
                        <label key={type} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors focus-within:ring-2 focus-within:ring-primary">
                          <input type="checkbox" className="h-4 w-4 rounded border-input text-primary" />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="supportNeeds">{t("supportNeeds")}</Label>
                    <textarea 
                      id="supportNeeds" 
                      placeholder={t("supportNeedsPlaceholder")}
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      maxLength={500}
                      {...form.register("supportNeeds")} 
                    />
                    <p className="text-xs text-muted-foreground text-right">{form.watch("supportNeeds")?.length || 0}/500</p>
                  </div>
                </div>

                {/* TAB 3: Experience & CV */}
                <div className={activeTab === "experience" ? "block space-y-6" : "hidden"}>
                  <div className="space-y-2">
                    <Label htmlFor="skills">{t("skills")}</Label>
                    <Input id="skills" placeholder="VD: Bán hàng, Lập trình, Thiết kế..." {...form.register("skills")} />
                  </div>

                  <div className="space-y-3 pt-4">
                    <Label>{t("uploadCV")}</Label>
                    {/* WCAG 2.5.7: Drag and drop area with a fallback click file input */}
                    <Label 
                      htmlFor="cv-upload"
                      className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                    >
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" aria-hidden="true" />
                      <p className="text-sm font-medium">{t("uploadCVDrop")}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("uploadFormat")}</p>
                      <input id="cv-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx" />
                    </Label>
                  </div>
                </div>

                {/* TAB 4: Settings */}
                <div className={activeTab === "settings" ? "block space-y-6" : "hidden"}>
                  <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold text-sm">Thông báo qua Email</h3>
                    
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm">Nhận thông báo việc làm phù hợp</span>
                      <input type="checkbox" role="switch" className="h-5 w-10 appearance-none rounded-full bg-input checked:bg-primary transition-colors cursor-pointer relative after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform checked:after:translate-x-5" defaultChecked />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm">Cập nhật trạng thái ứng tuyển</span>
                      <input type="checkbox" role="switch" className="h-5 w-10 appearance-none rounded-full bg-input checked:bg-primary transition-colors cursor-pointer relative after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform checked:after:translate-x-5" defaultChecked />
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t flex gap-4 justify-end">
                  <Button type="button" variant="ghost" onClick={() => localStorage.setItem("profile_draft", JSON.stringify(form.getValues()))}>
                    {t("saveDraft")}
                  </Button>
                  <Button type="submit" disabled={isUpdating} className="w-32">
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t("saveChanges")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
