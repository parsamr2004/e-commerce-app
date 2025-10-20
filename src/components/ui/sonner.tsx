"use client";

<<<<<<< HEAD
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
=======
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
>>>>>>> 5f825262c8bc76668f541fc423ec0e205863dec6

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
