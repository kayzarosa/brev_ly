export class InvalidLinkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidLinkError"
  }
}