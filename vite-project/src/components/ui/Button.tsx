
const Button = ({title, className}: {title: string, className?: string}) => {
  return (
    <button className={`cursor-pointer ${className}`}>{title} </button>
  )
}

export default Button
