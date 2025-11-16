import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-10 py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden>/</span>}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[#3B82F6] transition">
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-[#111827] font-medium" : ""}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}


