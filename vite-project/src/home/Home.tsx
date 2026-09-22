import Header from "../components/header/Header"
import Banner from "../components/banner/Banner"
import Category from "../components/category/Category"
import Courses from "../components/courses/Courses"
import WhyUs from "../components/whyUs/WhyUs"
import CourseFeature from "../components/courseFeature/CourseFeature"
import SuccessStories from "../components/successStories/SuccessStories"
import Footer from "../components/footer/Footer"

const Home = () => {
  return (
    <>
      <Header />
      <div className="relative">
  <Banner />
  <Category />
</div>

      <Courses />
      <WhyUs />
      <CourseFeature />
      <SuccessStories />
      <Footer />
    </>
  )
}

export default Home