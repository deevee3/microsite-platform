interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-slate-200 ${className}`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-slate-600">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
