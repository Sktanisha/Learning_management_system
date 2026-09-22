import Container from "../common/Container"
import Button from "../ui/Button"
import { FaPlay } from "react-icons/fa"

import StoryImage from "../../assets/images/successStroriesImages.jpg"

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      image: StoryImage,
    },
    {
      id: 2,
      image: StoryImage,
    },
    {
      id: 3,
      image: StoryImage,
    },
    {
      id: 4,
      image: StoryImage,
    },
  ]

  return (
    <section className="mt-[100px]">
      <Container>
        {/* Section title */}
        <div className="text-center font-anik">
          <h2 className="text-[30px] lg:text-[32px] font-bold text-primary">
            আমাদের সফলতার গল্পগুলো
          </h2>

          <p className="text-[16px] mt-2 text-primary">
            আমাদের হাতেই হওয়া প্রতিটি সফল
          </p>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-[45px]">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative w-full h-[175px] lg:h-[175px] overflow-hidden"
            >
              <img
                src={story.image}
                alt="success story"
                className="w-full h-full object-cover"
              />

              {/* Play button */}
              <button
                className="absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2
                w-[70px] h-[70px]
                rounded-full
                bg-primary
                border border-white
                flex items-center justify-center
                text-white"
              >
                <FaPlay className="text-[28px] ml-1" />
              </button>
            </div>
          ))}
        </div>

        {/* More button */}
        <div className="flex justify-center mt-[27px]">
          <Button
            className="text-lg rounded-lg font-semibold
            py-[7px] px-[38px]
            font-anik
            bg-[#7890AE]
            text-white"
            title="আরও দেখুন"
          />
        </div>
      </Container>
    </section>
  )
}

export default SuccessStories