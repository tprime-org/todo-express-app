import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { TaskFormData } from '@/types/task';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="O que precisa ser feito?"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="text-lg border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            required
          />
          <Textarea
            placeholder="Descrição adicional (opcional)"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[60px] border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            rows={2}
          />
        </div>
        <Button 
          type="submit" 
          variant="gradient" 
          className="w-full"
          disabled={!formData.title.trim()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Tarefa
        </Button>
      </form>
    </Card>
  );
}