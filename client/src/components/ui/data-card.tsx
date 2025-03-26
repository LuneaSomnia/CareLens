import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function DataCard({
  title,
  value,
  subtitle,
  icon,
  className,
  iconClassName
}: DataCardProps) {
  return (
    <Card className={cn("bg-neutral-50", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-center">
        {icon && (
          <div className={cn("w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-3", iconClassName)}>
            {icon}
          </div>
        )}
        <h4 className="text-neutral-600 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-mono font-medium text-neutral-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-neutral-600">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

interface ProgressDataCardProps extends DataCardProps {
  progress: number;
  progressColor?: string;
}

export function ProgressDataCard({
  title,
  value,
  subtitle,
  icon,
  className,
  iconClassName,
  progress,
  progressColor = "bg-success"
}: ProgressDataCardProps) {
  return (
    <Card className={cn("bg-neutral-50", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-center">
        {icon && (
          <div className={cn("w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-3", iconClassName)}>
            {icon}
          </div>
        )}
        <h4 className="text-neutral-600 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-mono font-medium text-neutral-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-neutral-600">{subtitle}</p>}
        
        <div className="mt-4 w-full">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-600">Progress</span>
            <span className="text-neutral-900 font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusDataCard({
  title,
  value,
  status,
  date,
  icon,
  className,
  iconClassName,
  nextCheck
}: {
  title: string;
  value: string | number;
  status: "up_to_date" | "due_soon" | "overdue";
  date: string;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  nextCheck?: string;
}) {
  const statusColors = {
    up_to_date: "bg-success bg-opacity-20 text-success",
    due_soon: "bg-warning bg-opacity-20 text-warning",
    overdue: "bg-error bg-opacity-20 text-error"
  };
  
  const statusText = {
    up_to_date: "Up to date",
    due_soon: "Due soon",
    overdue: "Overdue"
  };

  return (
    <Card className={cn("border border-neutral-200", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-neutral-900">{title}</h4>
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status]}`}>
            {statusText[status]}
          </span>
        </div>
        <div className="flex items-center">
          {icon && (
            <div className={cn("h-16 w-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center", iconClassName)}>
              {icon}
            </div>
          )}
          <div className="ml-4">
            <p className="text-sm text-neutral-600">Last reading</p>
            <p className="text-xl font-mono font-medium text-neutral-900">{value}</p>
            <p className="text-xs text-neutral-600">{date}</p>
          </div>
        </div>
        {nextCheck && (
          <div className="mt-4">
            <p className="text-xs text-neutral-600">
              Next recommended check: <span className="font-medium text-neutral-900">{nextCheck}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
