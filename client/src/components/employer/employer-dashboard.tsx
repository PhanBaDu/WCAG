/**
 * @file        src/components/employer/employer-dashboard.tsx
 * @description Employer Job Management Dashboard with TanStack Table.
 * @module      Employer/Dashboard
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        3.3.4 Error Prevention (Legal, Financial, Data) - Delete Confirmation
 *              4.1.2 Name, Role, Value - Table semantics and aria-labels
 */

"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { 
  useEmployerJobsQuery, 
  useDeleteJobMutation, 
  useUpdateJobStatusMutation 
} from "@/hooks/use-employer-jobs"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  Plus, 
  Pencil, 
  Trash2, 
  Ban, 
  CheckCircle2, 
  Clock 
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

type JobPosting = {
  id: string
  title: string
  status: string
  applicationsCount: number
  expiresAt: string
  createdAt: string
}

export function EmployerDashboard() {
  const t = useTranslations("Employer")
  const { data: jobs, isLoading } = useEmployerJobsQuery()
  const { mutateAsync: deleteJob } = useDeleteJobMutation()
  const { mutateAsync: updateStatus } = useUpdateJobStatusMutation()

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [jobToDelete, setJobToDelete] = React.useState<JobPosting | null>(null)

  const columnHelper = React.useMemo(() => createColumnHelper<JobPosting>(), [])

  const columns = React.useMemo(() => [
    columnHelper.accessor('title', {
      header: t("jobTitle"),
      cell: info => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('status', {
      header: t("tableStatus"),
      cell: info => {
        const val = info.getValue()
        if (val === 'APPROVED') {
          return <span className="inline-flex items-center rounded-none bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"><CheckCircle2 className="mr-1 h-3 w-3" /> {t("statusApproved")}</span>
        }
        if (val === 'PENDING') {
          return <span className="inline-flex items-center rounded-none bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"><Clock className="mr-1 h-3 w-3" /> {t("statusPending")}</span>
        }
        return <span className="inline-flex items-center rounded-none bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"><Ban className="mr-1 h-3 w-3" /> {t("statusClosed")}</span>
      },
    }),
    columnHelper.accessor('applicationsCount', {
      header: t("tableApplications"),
      cell: info => <span className="font-mono">{info.getValue()}</span>,
    }),
    columnHelper.accessor('expiresAt', {
      header: t("tableExpires"),
      cell: info => new Date(info.getValue()).toLocaleDateString('vi-VN'),
    }),
    columnHelper.display({
      id: 'actions',
      header: t("tableActions"),
      cell: ({ row }) => {
        const job = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-none text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center"
                onClick={() => {
                  window.location.href = `/employer/jobs/edit/${job.id}`;
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {t("actionEdit")}
              </DropdownMenuItem>
              {job.status !== 'CLOSED' && (
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center text-yellow-600"
                  onClick={async () => {
                    await updateStatus({ jobId: job.id, status: 'CLOSED' })
                    toast.success("Đã đóng tin tuyển dụng")
                  }}
                >
                  <Ban className="mr-2 h-4 w-4" />
                  {t("actionClose")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center text-destructive focus:text-destructive"
                onClick={() => {
                  setJobToDelete(job)
                  setDeleteModalOpen(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t("actionDelete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }),
  ], [t, updateStatus, setJobToDelete, setDeleteModalOpen, columnHelper])

  const table = useReactTable({
    data: jobs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  async function handleConfirmDelete() {
    if (!jobToDelete) return
    try {
      await deleteJob(jobToDelete.id)
      toast.success(t("jobDeletedSuccess"))
      setDeleteModalOpen(false)
      setJobToDelete(null)
    } catch {
      toast.error("Xóa thất bại")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("tableTitle")}</h1>
          <p className="text-muted-foreground">Quản lý các tin tuyển dụng của công ty bạn</p>
        </div>
        <Link href="/employer/jobs/create" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          {t("postJob")}
        </Link>
      </div>

      <div className="rounded-none border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="h-12 px-4 align-middle font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-4 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    Chưa có tin tuyển dụng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* WCAG Accessible Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              {t("confirmDelete")}
              <br/>
              <strong>Công việc: </strong>{jobToDelete?.title}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t("confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
