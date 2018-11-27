import * as React from 'react'

export default function TQStep({ finalUrl }: { finalUrl: string }) {
  return <div>
    <h3>Thank you!</h3>
    <a href={finalUrl}>Click here to access the product</a>
  </div>
}