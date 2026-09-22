import Container from "../common/Container"
import Button from "../ui/Button"
import Title from "../ui/Title"
import Courses_card from "./Courses_card"


const Courses = () => {
  return (
    <div>
      <section className="mt-[180px]"></section>
      <Container>
        <Title maintitle="আমাদের কোর্স সমুহ" subtitle="আমাদের সমস্ত কোর্স সুদক্ষ মেন্টর দ্বারা পরিচালিত  এবং সমৃদ্ধ রিসোর্স দ্বারা পরিপূর্ণ"/>
        <div className="mt-[62px]">
           <div className="grid grid-cols-3 gap-4">
             <Courses_card/>
            <Courses_card/>
            <Courses_card/>
            <Courses_card/>
            <Courses_card/>
           </div>

           <div className="flex justify-center mt-8">
  <Button
    className="text-xl rounded-[10px] font-semibold py-2 px-[38px] font-anik bg-[#7890AE] text-white"
    title="আরও কোর্স দেখুন"
  />
</div>
        </div>
        
        
      </Container>
    </div>
  )
}

export default Courses
