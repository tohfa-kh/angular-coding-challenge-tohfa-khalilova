import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent {
  @Input() selectedTodo: Todo = new Todo();
  @Output() sendTodoToListEvent: EventEmitter<NgForm> = new EventEmitter();
  isTextValid = false;

  sendTodoToList(todoForm: NgForm) {
    if (todoForm?.value?.editedText?.length >= 2) {
      this.isTextValid = true;
      this.sendTodoToListEvent.emit(todoForm.value);
    } else this.isTextValid = false;
  }
}
