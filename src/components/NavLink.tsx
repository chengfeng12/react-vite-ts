// src/components/NavLink.tsx
import { Link } from 'react-router-dom'
import type { To } from 'react-router-dom'

interface Props {
  to: To
  children: React.ReactNode
}

const NavLink = ({ to, children }: Props) => {
  return <Link to={to}>{children}</Link>
}

export default NavLink
