import Container from "../common/Container"
import Flex from "../ui/Flex"
import Image from "../ui/Image"
import BannerImage from "../../assets/images/banner.png"
import Button from "../ui/Button"


const Banner = () => {
  return (
    <section className="bg-primary pt-[81px] pb-[173px]">
      <Container >
        <Flex className=" gap-4 lg:gap-0 flex-col lg:flex-row">
            <div className=" w-full lg:w-2/4">
                <h1 className="lg:text-[50px] text-3xl max-w-[435px] font-anik text-white font-bold">
                    দেশের সর্ব বৃহৎ  
                    আইটি ট্রেনিং প্লাটফর্ম 
                </h1>
                <p className="mt-[45px] text-lg lg:text-xl font-normal font-anik text-white max-w-[457px]">আইটি ট্রেনিং এর মাধ্যমে নিজেকে স্বাবলম্বী করুন। নিজেকে 
                    আইটি এক্সপার্ট হিসেবে গড়ে তুলুন</p>
                    <Button className=" mt-[41px] text-lg lg:text-2xl rounded-[10px] font-semibold py-2 lg:py-[11px] px-5 lg:px-[58px] font-anik bg-secondary text-white" title="কোর্স দেখুন"/>
            </div>
            <div className="w-2/4">
                <Image imgurl={BannerImage} alt="bannerimage" />
            </div>
        </Flex>
      </Container>
    </section>
  )
}

export default Banner
