import Banner from "./components/banner/Banner"
import Category from "./components/category/Category"
import CourseFeature from "./components/courseFeature/CourseFeature"
import Courses from "./components/courses/Courses"  
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import SuccessStories from "./components/successStories/SuccessStories"
import WhyUs from "./components/whyUs/WhyUs"

const App = () => {
  return (
    <main>
      <Header />
      
      <section className="relative">
      <Banner/>
      <Category/> 
      </section>
      <Courses/> 
      <WhyUs/>
      <CourseFeature/>
      <SuccessStories/>
      <Footer/>
    </main>
  )
}

export default App
