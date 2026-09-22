import { useState } from "react"
import Container from "../common/Container"
import ListItem from "../ui/ListItem"
import type { NavList } from "../../types/navItemtype"
import Button from "../ui/Button"
import Flex from "../ui/Flex"
import { IoMdMenu } from "react-icons/io";


const Header = () => {
  let [isOpen,setIsOpen] = useState<boolean>(false);
  const [navList, setNavList]= useState<NavList[]>([
    {
      id: 1,
      title:"হোম"
    },
    {
      id: 2,
      title:"আমাদের কোর্সসমহ"
    },
    {
      id: 3,
      title:"যোগাযোগ"
    },
    {
      id: 4,
      title:"ক্যারিয়ার গাইডলাইন"
    }
  ])
  return (
    <header className="bg-primary text-white py-[15px]">
      <nav className="relative">
       <Container>
        <Flex className="justify-between items-center">
          <img src="images/logo.png" alt="logo"/>
        <ul className=" hidden lg:flex gap-6">
          {navList.map((item)=> (
             <ListItem className="text-2xl font-semibold font-anik" key= {item.id} item = {item}/>
          ))}
         
        </ul>
        {isOpen &&
        <ul className=" absolute px-5 py-5  w-full top-[65px] bg-primary  left-0 lg:hidden gap-6">
          {navList.map((item)=> (
             <ListItem className="text-2xl font-semibold font-anik" key= {item.id} item = {item}/>
          ))}
         
        </ul>
        }
        
        <div className="flex items-center gap-5">
        <Button className="text-lg lg:text-2xl rounded-[10px] font-semibold py-[11px] px:3 lg:px-[58px] font-anik bg-secondary text-white" title="কোর্স দেখুন"/>
        <IoMdMenu onClick={()=>setIsOpen(!isOpen)} className="lg:hidden text-3xl"/>
        </div>
        
        </Flex>
        
       </Container>

          
        
      </nav>
    </header>
  )
}

export default Header
