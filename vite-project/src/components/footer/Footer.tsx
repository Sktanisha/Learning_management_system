import Container from "../common/Container"
import Button from "../ui/Button"
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-white mt-[100px]">

      {/* Admission section */}
      <div className="text-center font-anik pt-[25px]">
        <h2 className="text-[42px] lg:text-[50px] font-bold">
          ভর্তি চলছে
        </h2>

        <p className="mt-2.5 text-[16px]">
          আমাদের অনলাইন অথবা অফলাইন কোর্সে এনরোল করে ফেলুন
        </p>

        <div className="flex justify-center gap-[25px] mt-[25px]">
          <Button
            title="সকল কোর্স দেখুন"
            className="border border-white rounded-lg px-8 py-[7px] font-anik text-[16px] cursor-pointer"
          />

          <Button
            title="আমাদের সম্পর্কে যোগ দিন"
            className="border border-white rounded-2 px-[25px] py-[7px] font-anik text-[16px] cursor-pointer"
          />
        </div>
      </div>

      {/* Footer information */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-[65px]">

          {/* Address */}
          <div className="font-anik">
            <h3 className="text-[18px] font-semibold mb-[15px]">
              আমাদের ঠিকানা
            </h3>

            <div className="flex items-start gap-3 mb-3">
              <FaMapMarkerAlt className="mt-[5px]" />
              <p>২৮ / ২, মেহের রাজা, ধানমন্ডি, ঢাকা</p>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <FaPhoneAlt />
              <p>+৮৮ ০১৯৫৫৫৫৯৭০৬</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope />
              <p>info@codenuniya.com</p>
            </div>
          </div>

          {/* Important links */}
          <div className="font-anik">
            <h3 className="text-[18px] font-semibold mb-[15px]">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-[7px] text-[15px]">
              <li>আমাদের কোর্স</li>
              <li>কোর্স</li>
              <li>আমাদের ব্যাচ</li>
              <li>প্রাইভেসি পলিসি</li>
              <li>আমাদের সেমিনার</li>
            </ul>
          </div>

          {/* Popular courses */}
          <div className="font-anik">
            <h3 className="text-[18px] font-semibold mb-[15px]">
              জনপ্রিয় কোর্সসমূহ
            </h3>

            <ul className="space-y-[7px] text-[15px]">
              <li>ওয়েব ডেভেলপমেন্ট</li>
              <li>গ্রাফিক্স ডিজাইন</li>
              <li>ওয়েব ডেভেলপমেন্ট</li>
              <li>সাইবার সিকিউরিটি</li>
              <li>ভিডিও এডিটিং</li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <div className="w-full h-[125px] bg-[#D9D9D9]">
              {/* Google Map will go here */}
            </div>
          </div>

        </div>

        {/* Logo / Brand */}
        <div className="text-center font-anik mt-[60px]">
          <h2 className="text-[42px] lg:text-[50px] font-bold">
            কোড দুনিয়া
          </h2>

          <p className="text-[20px]">
            দেশের সর্ববৃহৎ আইটি ট্রেনিং প্লাটফর্ম
          </p>

          {/* Social icons */}
          <div className="flex justify-center items-center gap-[18px] mt-[15px]">
            <FaFacebookF className="text-[20px] cursor-pointer" />
            <FaLinkedinIn className="text-[20px] cursor-pointer" />
            <FaYoutube className="text-[20px] cursor-pointer" />
            <FaXTwitter className="text-[20px] cursor-pointer" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center border-t border-transparent mt-[65px] pb-[15px] font-anik text-[12px]">
          <p>
            ২০২৪ কপিরাইট | মাহফুজুর রহমান রাহাত | সর্বস্বত্ব সংরক্ষিত
          </p>

          <p>
            প্রাইভেসি পলিসি
          </p>
        </div>

      </Container>
    </footer>
  )
}

export default Footer