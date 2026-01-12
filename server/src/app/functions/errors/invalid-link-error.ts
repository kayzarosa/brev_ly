export class InvalidLinkError extends Error {
  constructor() {
    super('Shortened link already registered.')
  }
}