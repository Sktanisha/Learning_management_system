import Container from "../common/Container"
import Image from "../ui/Image"
import FeatureImage from "../../assets/images/banner.png"

const CourseFeature = () => {
  const features = [
    "সপ্তাহে ১ - ৩ দিন ক্লাস",
    "অনলাইন / অফলাইন ক্লাস প্রতিটি কোর্সে",
    "মনোরম ক্লাস রুম",
    "অনলাইন ২৪/৭ সাপোর্ট",
    "অত্যাধুনিক ল্যাব এবং প্রজেক্ট এর সুবিধা",
  ]

  return (
    <section className="mt-[100px]">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-[50px]">

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <Image
              className="w-full max-w-[455px] rounded-[15px] border-[5px] border-[#1B263B]"
              imgurl={FeatureImage}
              alt="course features"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-anik text-[30px] lg:text-[32px] font-bold text-primary">
              আমাদের কোর্সের বিশেষত্ব
            </h2>

            <ul className="mt-[30px] space-y-[15px]">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-5 font-anik text-[18px] lg:text-[20px] text-primary"
                >
                  <span className="mt-4 w-3 h-3 shrink-0 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Container>
    </section>
  )
}

export default CourseFeature