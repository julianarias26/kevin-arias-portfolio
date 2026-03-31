import { Injectable }  from '@angular/core';
import emailjs          from '@emailjs/browser';
import { from, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactForm {
  name:    string;
  email:   string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor() {
    // Inicializa EmailJS con tu public key una sola vez
    emailjs.init(environment.emailjs.publicKey);
  }

  send(form: ContactForm): Observable<void> {
    const templateParams = {
      from_name:  form.name,
      reply_to:   form.email,
      message:    form.message,
      time:       new Date().toLocaleString(),
    };

    const promise = emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
      )
      .then(() => void 0);

    return from(promise).pipe(
      catchError(error => {
        console.error('EmailJS error:', error);
        return throwError(() => new Error('Failed to send message'));
      })
    );
  }
}