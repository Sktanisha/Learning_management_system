import Container from "../common/Container"
import Title from "../ui/Title"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const WhyUs = () => {
  const whyUsItems = [
    {
      id: 1,
      title: "৯০%",
      subtitle: "সফলতার হার",
      description:
        "এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে",
    },
    {
      id: 2,
      title: "১০,০০০ +",
      subtitle: "ক্যারিয়ার প্লেসমেন্ট",
      description:
        "এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে",
    },
    {
      id: 3,
      title: "৫০০০০০ +",
      subtitle: "স্টুডেন্ট এর পছন্দ",
      description:
        "এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে এখানে কিছু টেক্সট বসবে",
    },
  ]

  return (
    <section className="mt-[100px]">
      <Container>
        <Title
          maintitle="কেন আমরাই সেরা"
          subtitle="কেন আপনি আমাদের নেবেন"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-[43px]">
          {whyUsItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1B263B] text-white rounded-xl px-4 py-[30px] min-h-[264px]"
            >
              <h3 className="font-anik text-[28px] font-semibold">
                {item.title}
              </h3>

              <h4 className="font-anik text-[28px] font-semibold leading-[1.2]">
                {item.subtitle}
              </h4>

              <p className="font-anik text-[15px] font-normal leading-[1.7] mt-[18px] max-w-[290px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2.5 mt-[25px]">
          <button className="w-11 h-11 rounded-full bg-[#1B263B] text-white flex items-center justify-center">
            <FaAngleLeft className="text-[22px]" />
          </button>

          <button className="w-11 h-11 rounded-full bg-[#1B263B] text-white flex items-center justify-center">
            <FaAngleRight className="text-[22px]" />
          </button>
        </div>
      </Container>
    </section>
  )
}

export default WhyUs