import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-pin-dialog',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="pin-overlay" (click)="onOverlayClick($event)">
      <div class="pin-dialog">
        <h3 class="pin-title">Admin Access</h3>
        <p class="pin-subtitle">Enter PIN to continue</p>
        <input
          type="password"
          class="pin-input"
          [(ngModel)]="pin"
          (keydown.enter)="submit()"
          placeholder="Enter PIN"
          maxlength="10"
          autocomplete="off"
        >
        @if (error) {
          <p class="pin-error">Incorrect PIN</p>
        }
        <div class="pin-actions">
          <button class="btn-cancel" (click)="cancel.emit()">Cancel</button>
          <button class="btn-submit" (click)="submit()">Unlock</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pin-overlay {
      position: fixed;
      inset: 0;
      z-index: 300;
      background: var(--overlay);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pinFadeIn 0.2s ease both;
    }
    .pin-dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      padding: 32px;
      width: 320px;
      max-width: 90vw;
    }
    .pin-title {
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .pin-subtitle {
      font-size: 0.8125rem;
      color: var(--text-muted);
      margin-bottom: 20px;
    }
    .pin-input {
      width: 100%;
      padding: 12px;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-family: var(--font-family);
      font-size: 1rem;
      letter-spacing: 0.2em;
      text-align: center;
      outline: none;
      transition: border-color 0.2s ease;
    }
    .pin-input:focus {
      border-color: var(--accent);
    }
    .pin-error {
      color: #c45;
      font-size: 0.75rem;
      margin-top: 8px;
      text-align: center;
    }
    .pin-actions {
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }
    .btn-cancel, .btn-submit {
      flex: 1;
      padding: 10px;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      font-family: var(--font-family);
    }
    .btn-cancel {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-secondary);
    }
    .btn-cancel:hover {
      border-color: var(--text-muted);
      color: var(--text-primary);
    }
    .btn-submit {
      background: var(--accent);
      border: 1px solid var(--accent);
      color: #fff;
    }
    .btn-submit:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
    @keyframes pinFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
})
export class PinDialogComponent {
  @Output() authenticated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  pin = '';
  error = false;

  constructor(private admin: AdminService) {}

  submit() {
    if (this.admin.authenticate(this.pin)) {
      this.authenticated.emit();
    } else {
      this.error = true;
      this.pin = '';
    }
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('pin-overlay')) {
      this.cancel.emit();
    }
  }
}
