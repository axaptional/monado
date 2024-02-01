import { Result } from '../result'

export namespace SafeURI {
  export function decode(encodedURI: string): Result<string, URIError> {
    return Result.fromCall(() => decodeURI(encodedURI))
  }

  export function decodeComponent(
    encodedURI: string
  ): Result<string, URIError> {
    return Result.fromCall(() => decodeURIComponent(encodedURI))
  }

  export function encode(uri: string): Result<string, URIError> {
    return Result.fromCall(() => encodeURI(uri))
  }

  export function encodeComponent(
    uriComponent: string | number | boolean
  ): Result<string, URIError> {
    return Result.fromCall(() => encodeURIComponent(uriComponent))
  }
}
