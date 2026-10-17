export type EmailMessage = {
  to: string
  subject: string
  /** Ссылка входа без экранирования: консольный отправитель печатает её как есть, чтобы её можно было скопировать. */
  url: string
  html: string
}

export interface EmailSender {
  send(message: EmailMessage): Promise<void>
}