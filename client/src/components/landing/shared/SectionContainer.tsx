import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionContainer({
  children,
  className = "",
  id,
}: SectionContainerProps) {
  return (
    <div
      id={id}
      className={`max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop ${className}`}
    >
      {children}
    </div>
  );
}
