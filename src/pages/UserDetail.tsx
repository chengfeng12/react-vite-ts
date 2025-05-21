// src/pages/UserDetail.tsx
import { useParams } from 'react-router-dom'

export default function UserDetail() {
  const { id } = useParams<{ id: string }>() // 明确参数类型
  return <div>User ID: {id}</div>
}
