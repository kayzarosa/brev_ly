export class IncrementQuantityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "IncrementQuantityError"
  }
}