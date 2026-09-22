
const Title = ({maintitle, subtitle }:{ maintitle:string, subtitle:string }) => {
  return (
    <div>
      <h2 className="text-[36px] font-bold text-primary text-center font-anik">{maintitle}</h2>
      <p className="text-[20px] mt-[15px] font-medium text-primary text-center font-anik">{subtitle}</p>
    </div>
  )
}

export default Title
