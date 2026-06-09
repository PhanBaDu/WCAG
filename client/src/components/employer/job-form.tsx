/**
 * @file        src/components/employer/job-form.tsx
 * @description Job creation and editing form with accessible TipTap rich text editor.
 * @module      Employer/JobForm
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        1.3.1 Info and Relationships (A) - Semantic output from TipTap
 *              2.1.1 Keyboard (A) - Editor is fully keyboard navigable
 *              3.3.4 Error Prevention (AA) - Autosave draft functionality
 */

"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useCreateJobMutation } from "@/hooks/use-employer-jobs"
import { useRouter } from "@/i18n/routing"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import { Loader2, Bold, Italic, List, ListOrdered } from "lucide-react"

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  description: z.string().min(50, "Description must be at least 50 characters"),
  jobTypes: z.array(z.string()).min(1, "Select at least one job type"),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  acceptedDisabilities: z.array(z.string()).min(1, "Select at least one accepted disability type"),
  accommodationsOffered: z.string().optional(),
  isDisabilityPriority: z.boolean(),
  expiresAt: z.string().optional(),
  status: z.enum(['DRAFT', 'PENDING']),
})

type JobFormValues = z.infer<typeof jobSchema>

export function JobForm() {
  const t = useTranslations("Employer")
  const router = useRouter()
  const { mutateAsync: createJob, isPending } = useCreateJobMutation()

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      jobTypes: [],
      salaryMin: "",
      salaryMax: "",
      acceptedDisabilities: [],
      accommodationsOffered: "",
      isDisabilityPriority: false,
      expiresAt: "",
      status: "DRAFT",
    },
  })

  // TipTap Editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      form.setValue('description', editor.getHTML(), { shouldValidate: true, shouldDirty: true })
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4 border rounded-b-md bg-background',
        'aria-label': 'Job description editor',
      },
    },
  })

  // Auto-save draft every 30s
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (form.formState.isDirty) {
        localStorage.setItem("employer_job_draft", JSON.stringify(form.getValues()))
      }
    }, 30000)
    return () => clearInterval(timer)
  }, [form])

  async function onSubmit(values: JobFormValues) {
    try {
      // Format accommodations string to array for backend
      const finalData = {
        ...values,
        salaryMin: values.salaryMin ? Number(values.salaryMin) : undefined,
        salaryMax: values.salaryMax ? Number(values.salaryMax) : undefined,
        accommodationsOffered: values.accommodationsOffered 
          ? values.accommodationsOffered.split(',').map(s => s.trim()).filter(Boolean)
          : []
      }
      
      await createJob(finalData)
      toast.success(values.status === 'DRAFT' ? "Bản nháp đã được lưu!" : t("jobPostedSuccess"))
      localStorage.removeItem("employer_job_draft")
      
      if (values.status === 'PENDING') {
        router.push("/employer/dashboard")
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none md:border-solid md:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("postJob")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-2">
            <Label htmlFor="title">{t("jobTitle")}</Label>
            <Input 
              id="title" 
              placeholder={t("jobTitlePlaceholder")}
              {...form.register("title")} 
            />
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("description")}</Label>
            
            {/* TipTap Accessible Toolbar */}
            <div className="border rounded-t-md bg-muted/50 p-1 flex gap-1 flex-wrap" role="toolbar" aria-label="Text formatting">
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                data-active={editor?.isActive('bold')}
                className="h-8 w-8 p-0 data-[active=true]:bg-primary/20"
                aria-label="Bold text" aria-pressed={editor?.isActive('bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                data-active={editor?.isActive('italic')}
                className="h-8 w-8 p-0 data-[active=true]:bg-primary/20"
                aria-label="Italic text" aria-pressed={editor?.isActive('italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1 self-center" />
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                data-active={editor?.isActive('bulletList')}
                className="h-8 w-8 p-0 data-[active=true]:bg-primary/20"
                aria-label="Bullet list" aria-pressed={editor?.isActive('bulletList')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                data-active={editor?.isActive('orderedList')}
                className="h-8 w-8 p-0 data-[active=true]:bg-primary/20"
                aria-label="Ordered list" aria-pressed={editor?.isActive('orderedList')}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            <EditorContent editor={editor} />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium mb-1">{t("jobTypes")}</legend>
              <div className="flex flex-col gap-2">
                {['FULL_TIME', 'PART_TIME', 'REMOTE', 'HYBRID'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value={type} {...form.register("jobTypes")} className="h-4 w-4 rounded border-input text-primary" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
              {form.formState.errors.jobTypes && <p className="text-sm text-destructive">{form.formState.errors.jobTypes.message}</p>}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium mb-1">{t("acceptedDisabilities")}</legend>
              <div className="flex flex-col gap-2">
                {['MOBILITY', 'VISUAL', 'HEARING', 'SPEECH', 'COGNITIVE'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" value={type} {...form.register("acceptedDisabilities")} className="h-4 w-4 rounded border-input text-primary" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
              {form.formState.errors.acceptedDisabilities && <p className="text-sm text-destructive">{form.formState.errors.acceptedDisabilities.message}</p>}
            </fieldset>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">{t("salaryMin")}</Label>
              <Input id="salaryMin" type="number" min="0" placeholder="0" {...form.register("salaryMin")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">{t("salaryMax")}</Label>
              <Input id="salaryMax" type="number" min="0" placeholder="Vô hạn" {...form.register("salaryMax")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodations">{t("accommodations")}</Label>
            <Input 
              id="accommodations" 
              placeholder="VD: Đường dốc xe lăn, Phần mềm đọc màn hình, Giờ làm linh hoạt..."
              {...form.register("accommodationsOffered")} 
            />
          </div>

          <label className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20 cursor-pointer hover:bg-muted/50 transition-colors">
            <input type="checkbox" className="h-5 w-5 rounded border-input text-primary" {...form.register("isDisabilityPriority")} />
            <div>
              <p className="font-semibold">{t("isPriority")}</p>
              <p className="text-sm text-muted-foreground">Đánh dấu nếu công việc này đặc biệt ưu tiên tuyển dụng người khuyết tật.</p>
            </div>
          </label>

          <div className="pt-6 border-t flex flex-wrap gap-4 justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                form.setValue("status", "DRAFT");
                form.handleSubmit(onSubmit)();
              }}
              disabled={isPending}
            >
              {t("saveDraft")}
            </Button>
            <Button 
              type="submit"
              onClick={() => form.setValue("status", "PENDING")}
              disabled={isPending}
              className="min-w-[150px]"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("submitPending")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
