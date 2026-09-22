import Container from "../common/Container"
import CategoryItem from "./CategoryItem"
import CTimg1 from "../../assets/images/ci1.svg"
import CTimg2 from "../../assets/images/ct2.svg"
import CTimg3 from "../../assets/images/ct3.svg"
import CTimg4 from "../../assets/images/ct4.svg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Category = () => {
    const categoryItems = [
        {
            id:1,
            name:"গ্রাফিকস",
            icon: CTimg1
        },
        {
            id:2,
            name:"নেটওয়ার্কিং",
            icon: CTimg2
        },
        {
            id:3,
            name:"সফটওয়্যার",
            icon: CTimg3
        },
        {
            id:4,
            name:"ফিল্ম মিডিয়া",
            icon: CTimg4
        },
        {
            id:5,
            name:"ফিল্ম ",
            icon: CTimg4
        }
    ]

type CustomArrowProps = {
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

    function SampleNextArrow(props:CustomArrowProps) {
  const {  style, onClick } = props;
  return (
    <div
      className="bg-secondary rounded-[50%] text-white top-2/4 translate-y-[-50%]"
      style={{ ...style, display: "inline-block",  width:"50px", height:"50px", fontSize:"50px", 
        position:"absolute", right:"-50px", zIndex:"999" }}
      onClick={onClick}
    > <FaAngleRight /></div>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const {  style, onClick } = props;
  return (
    <div
      className="bg-secondary rounded-[50%] text-white top-2/4 translate-y-[-50%]"
      style={{ ...style, display: "inline-block",  width:"50px", height:"50px", fontSize:"50px", 
        position:"absolute", left:"-100px", zIndex:"999" }}
      onClick={onClick}
    > <FaAngleLeft /></div>
  );
}
    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }
    ]
  };
  return (
    <section className="w-full absolute bottom-[-100px]">
      <Container>
        <Slider {...settings}>
            {categoryItems.map((item)=>(
            <CategoryItem item={item}/>
        ))}
        </Slider>
        
       
      </Container>
    </section>
  )
}

export default Category
