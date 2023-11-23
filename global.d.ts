interface Date {
  addDays: (days: number) => Date
}
import React from 'react'

declare module 'react' {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
//to fix error that when I want to add function (addDays) to Date.prototype, happen.
