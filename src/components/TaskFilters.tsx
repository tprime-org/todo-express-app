import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TaskFilter } from '@/types/task';
import { CheckCircle2, Circle, List } from 'lucide-react';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function TaskFilters({ currentFilter, onFilterChange, stats }: TaskFiltersProps) {
  const filters = [
    {
      key: 'all' as TaskFilter,
      label: 'Todas',
      count: stats.total,
      icon: List,
    },
    {
      key: 'pending' as TaskFilter,
      label: 'Pendentes',
      count: stats.pending,
      icon: Circle,
    },
    {
      key: 'completed' as TaskFilter,
      label: 'Completas',
      count: stats.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <Card className="p-4 shadow-card">
      <div className="flex gap-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = currentFilter === filter.key;
          
          return (
            <Button
              key={filter.key}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className="flex-1 justify-center gap-2"
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter.count}
              </span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}