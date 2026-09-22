import Merncourse from "../../assets/images/card.png"
import Button from "../ui/Button";
import Flex from "../ui/Flex"
import Image from "../ui/Image"
import { FaStar } from "react-icons/fa";

const Courses_card = () => {
  return (
    <div className="max-w-[377px] font-anik">
      <Image imgurl={Merncourse} alt="MernCourse"/> 
      <div className="bg-secondary text-white px-4 py-2 rounded-b-[20px]" >
        <Flex className="justify-between">
            <h4 className="  text-sm font-medium">Web and Software</h4>
            <h5 className=" text-sm font-medium">৩০০০ স্টুডেন্ট</h5>
        </Flex>
        <h2 className=" font-bold text-2xl">MERN Stack Develepment</h2>
        <h2 className=" font-bold text-sm flex items-center"><FaStar className="pr-[5px] text-yellow-400"/>Rating | 450 Reviews</h2>
        <h2 className=" font-bold text-2xl flex justify-between items-center">৳  1,20000 BDT <Button className="text-xl 
        rounded-[10px] font-semibold py-3 px-[38px] font-anik bg-primary text-white" title="ডিসকাউন্ট"/> </h2>
      </div>
    </div>
  )
}

export default Courses_card
