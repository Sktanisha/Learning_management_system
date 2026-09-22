import type { CategoryType } from "../../types/navItemtype"
import Image from "../ui/Image"

const CategoryItem = ({item}: {item: CategoryType}) => {
  return (
    <div className="w-[230px] py-[15px] rounded-[25px] text-center text-white bg-[#1B263b]">
        <Image className="mx-auto" imgurl={item.icon} alt="icon"/>
<h3 className=" mt-[9px] font-anik font-semibold text-2xl">{item.name}</h3>
    </div>
  )
}

export default CategoryItem
