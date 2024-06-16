/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
type Props = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  endpoint: string
  body?: XMLHttpRequestBodyInit
  tags?: string[]
  noCache?: boolean
}

const fetchBase = async <T>({ method, endpoint, body, tags, noCache = false }: Props) => {
  const baseUrl = process.env.API_URL

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*'
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method,
    headers,
    next: {
      revalidate: 0,
      tags
    },
    body
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Something went wrong')
  }

  return (await response.json()) as T
}

export default fetchBase
