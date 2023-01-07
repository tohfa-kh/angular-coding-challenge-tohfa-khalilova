import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoEventValue } from '../../models/todo-event-value';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() todo: Todo = new Todo();
  @Input() index = 0;
  @Output() markTodoEvent = new EventEmitter<TodoEventValue>();
  @Output() editTextEvent = new EventEmitter<TodoEventValue>();
  @Output() deleteTodoEvent = new EventEmitter<number>();
  editMode = false;

  mark() {
    this.todo.checked = !this.todo.checked;
    let todoEventValue: TodoEventValue = {
      index: this.index,
      marked: this.todo.checked,
    };
    this.markTodoEvent.emit(todoEventValue);
  }

  edit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  getEditedText(e: any) {
    this.todo.text = e.editedText;
    let todoEventValue: TodoEventValue = {
      index: this.index,
      text: this.todo.text,
    };
    this.editTextEvent.emit(todoEventValue);
  }

  remove() {
    this.deleteTodoEvent.emit(this.index);
  }
}
