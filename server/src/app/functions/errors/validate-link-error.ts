export class ValidateLinkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidateLinkError"
  }
}