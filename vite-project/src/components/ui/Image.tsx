import type { ImageType } from "../../types/imgType"


const Image = ({imgurl, alt, className}:ImageType) => {
  return (
    <img className={className} src={imgurl} alt={alt}/>
  )
}

export default Image
