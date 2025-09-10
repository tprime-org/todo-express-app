import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { TaskItem } from './TaskItem';
import { CheckCircle2, ListTodo } from 'lucide-react';

export function TaskManager() {
  const {
    tasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
  } = useTasks();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-card">
              <ListTodo className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gerenciador de Tarefas
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>

        {/* Form */}
        <div className="mb-6">
          <TaskForm onSubmit={addTask} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilters 
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-muted rounded-2xl">
                  {filter === 'completed' ? (
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
                  ) : (
                    <ListTodo className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                {filter === 'completed' 
                  ? 'Nenhuma tarefa completa'
                  : filter === 'pending'
                  ? 'Nenhuma tarefa pendente'
                  : 'Nenhuma tarefa encontrada'
                }
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all' 
                  ? 'Comece adicionando sua primeira tarefa!'
                  : `Todas suas tarefas estão ${filter === 'pending' ? 'completas' : 'pendentes'}.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3 group">
              {tasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TaskItem
                    task={task}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Total: {stats.total} tarefa{stats.total !== 1 ? 's' : ''} • 
              Completas: {stats.completed} • 
              Pendentes: {stats.pending}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}