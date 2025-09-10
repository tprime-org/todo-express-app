import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/types/task';
import { 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  Calendar 
} from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'created_at'>>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
  });

  const handleSave = () => {
    if (editData.title.trim()) {
      onUpdate(task.id, {
        title: editData.title,
        description: editData.description,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <Card className={`group p-4 shadow-card hover:shadow-hover transition-all duration-200 animate-fade-in ${
      task.completed ? 'bg-gradient-success/5 border-success/20' : ''
    }`}>
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 ${
            task.completed 
              ? 'text-success hover:text-success/80' 
              : 'text-muted-foreground hover:text-primary'
          }`}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="font-medium"
                placeholder="Título da tarefa"
              />
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição (opcional)"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleSave}
                  disabled={!editData.title.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className={`font-medium leading-snug ${
                task.completed 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm leading-relaxed ${
                  task.completed 
                    ? 'line-through text-muted-foreground/80' 
                    : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Criado em {formatDate(task.created_at)}</span>
                </div>
                {task.updated_at !== task.created_at && (
                  <span>• Atualizado em {formatDate(task.updated_at)}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-primary"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}