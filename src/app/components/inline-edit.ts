import { 
  Component,
  Input,
  Output, 
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer,
  forwardRef }          from '@angular/core';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR }   from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'inline-edit',
  templateUrl: '../templates/inline-edit.html',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['../../assets/styles/inline-edit.component.css']
})

export class InlineEditComponent implements ControlValueAccessor {
  @ViewChild('inlineEditControl') inlineEditControl;
  @Input() field: string = '';
  @Input() disabled: boolean = false;
  @Output() update: EventEmitter<Object> = new EventEmitter<Object>();

  private _value: string = '';
  private preValue: string = '';
  private editing: boolean = false;
  private _changed: boolean = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): string {
    return this._value;
  }

  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this._changed = true;
      this.onChange(v);
    }
  }

  constructor(
    element: ElementRef,
    private _renderer: Renderer
  ) {}

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onBlur(value: Object) {
    this.editing = false;
    if (this._changed) {
      this.update.emit(value);
      this._changed = false;
    }
  }

  edit(value) {
    if (this.disabled) return;
    this.preValue = value;
    this.editing = true;
    setTimeout(_ => {
      this._renderer.invokeElementMethod(
        this.inlineEditControl.nativeElement,
      'focus', [])
    });
  }
}
