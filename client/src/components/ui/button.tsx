import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const govButtonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-none border border-[#0b0c0c] border-b-[4px] border-b-[#0b0c0c] bg-white px-4 py-2.5 text-sm font-normal text-[#0b0c0c] transition-[transform,background-color] duration-150 outline-none select-none cursor-pointer hover:bg-[#ececec] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0 active:translate-y-[1px] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const buttonVariants = cva(
  `${govButtonBase} focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
  {
    variants: {
      variant: {
        default: "bg-white hover:bg-[#ececec]",
        outline:
          "bg-white hover:bg-[#ececec] aria-expanded:bg-[#ececec] aria-expanded:text-[#0b0c0c]",
        secondary:
          "bg-[#f6f6f6] hover:bg-[#e4e4e4] aria-expanded:bg-[#e4e4e4] aria-expanded:text-[#0b0c0c]",
        ghost:
          "border-transparent bg-transparent hover:bg-[#ececec] aria-expanded:bg-[#ececec]",
        destructive:
          "border-[#b10e1e] bg-[#f6d7d2] text-[#741012] hover:bg-[#efb8b0] focus-visible:ring-[#b10e1e]/20 dark:border-[#ffb8b0] dark:bg-[#5a1d1d] dark:text-[#fff]",
        link: "border-transparent bg-transparent px-0 py-0 text-primary hover:bg-transparent hover:underline",
      },
      size: {
        default:
          "min-h-11 px-4 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "min-h-9 px-3 text-xs has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-12 px-4 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-12 px-5 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-11 p-0",
        "icon-xs":
          "size-9 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "h-12 w-12 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
