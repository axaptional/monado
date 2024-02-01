import { None, type Option, Some } from '../option'

export namespace SafeString {
  export function at(string: string, index: number): Option<string> {
    if (Math.abs(index) >= string.length) {
      return None
    }
    return Some(string.at(index)!)
  }

  export function charAt(string: string, index: number): Option<string> {
    if (index < 0 || index >= string.length) {
      return None
    }
    return Some(string.charAt(index))
  }

  export function charCodeAt(string: string, index: number): Option<number> {
    if (index < 0 || index >= string.length) {
      return None
    }
    return Some(string.charCodeAt(index))
  }

  export function codePointAt(string: string, index: number): Option<number> {
    if (index < 0 || index >= string.length) {
      return None
    }
    return Some(string.codePointAt(index)!)
  }

  export function indexOf(
    string: string,
    searchString: string,
    position?: number
  ): Option<number> {
    return Some(string.indexOf(searchString, position)).filter(
      (index) => index !== -1
    )
  }

  export function lastIndexOf(
    string: string,
    searchString: string,
    position?: number
  ): Option<number> {
    return Some(string.lastIndexOf(searchString, position)).filter(
      (index) => index !== -1
    )
  }
}
