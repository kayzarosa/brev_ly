export class DeleteLinkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DeleteLinkError'
  }
}
