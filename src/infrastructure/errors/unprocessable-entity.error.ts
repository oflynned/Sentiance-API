import { HttpError } from './http.error';

export class UnprocessableEntityError extends HttpError {
  constructor(context: string = 'Payload was unprocessable') {
    super(UnprocessableEntityError.name, 422, context);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }
}
