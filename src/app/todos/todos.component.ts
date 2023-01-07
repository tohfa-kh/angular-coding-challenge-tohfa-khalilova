import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from '../models/todo';
import { TodoEventValue } from '../models/todo-event-value';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  @ViewChild('input') input: any;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorageService.get('todos') !== null) {
      this.todos = this.localStorageService.get('todos');
    }
  }

  onSubmit(todoText: string): void {
    this.todos.push({
      text: todoText,
      checked: false,
    });
    this.localStorageService.set('todos', this.todos);
  }

  updateMarkState(e: TodoEventValue) {
    this.todos[e.index] = { ...this.todos[e.index], checked: e.marked };
    this.localStorageService.set('todos', this.todos);
  }

  updateTodoText(e: TodoEventValue) {
    this.todos[e.index] = { ...this.todos[e.index], text: e.text };
    this.localStorageService.set('todos', this.todos);
  }

  deleteTodo(index: number) {
    this.todos = this.todos?.filter((value, i) => i !== index);
    this.localStorageService.set('todos', this.todos);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
