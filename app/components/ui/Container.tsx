import { cn } from "~/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
