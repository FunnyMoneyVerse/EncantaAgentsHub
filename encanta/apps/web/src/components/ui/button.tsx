"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-purple-950 dark:focus-visible:ring-purple-300",
    {
        variants: {
            variant: {
                default: "bg-purple-800 text-white hover:bg-purple-900 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:text-white dark:hover:bg-red-800",
                outline:
                    "border border-purple-200 bg-white text-purple-800 hover:bg-purple-100 hover:text-purple-900 dark:border-purple-700 dark:bg-purple-950 dark:text-white dark:hover:bg-purple-800 dark:hover:text-white",
                secondary:
                    "bg-purple-100 text-purple-900 hover:bg-purple-200 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600",
                ghost: "text-purple-800 hover:bg-purple-100 hover:text-purple-900 dark:text-white dark:hover:bg-purple-800 dark:hover:text-white",
                link: "text-purple-800 underline-offset-4 hover:underline dark:text-purple-300",
                primary: "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-700",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants } 