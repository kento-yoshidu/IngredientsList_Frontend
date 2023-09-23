import { Link } from "react-router-dom"

const Button = ({ link, text }: { link: string, text: string }) => {
  return (
    <Link to={link}>
      {text}
    </Link>
  )
}

export default Button
