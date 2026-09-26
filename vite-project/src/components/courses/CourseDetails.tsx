import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Merncourse from "../../assets/images/card.png";
type Instructor = {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
};

type Lesson = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  category: string;
  rating: number;
  instructor: Instructor;
  lessons?: Lesson[];
  students?: string[];
};

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const data = await api(`/courses/${id}`);

        setCourse(data.course);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "কোর্স লোড করা যায়নি";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!id) return;

    if (!user) {
      setEnrollMessage("কোর্সে ভর্তি হতে প্রথমে লগইন করুন");
      return;
    }

    if (user.role !== "student") {
      setEnrollMessage("শুধুমাত্র শিক্ষার্থীরা কোর্সে ভর্তি হতে পারবেন");
      return;
    }

    try {
      setIsEnrolling(true);
      setEnrollMessage("");

      const data = await api("/enrollments", {
        method: "POST",
        body: JSON.stringify({
          courseId: id,
        }),
      });

      setEnrollMessage(data.message);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "কোর্সে ভর্তি হওয়া যায়নি";

      setEnrollMessage(message);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-anik text-gray-600">কোর্স লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-anik">
            {error || "কোর্স পাওয়া যায়নি"}
          </p>

          <Link
            to="/"
            className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <Link to="/" className="text-primary font-anik font-semibold">
            ← হোমে ফিরে যান
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Course overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <img
              src={course.thumbnail || Merncourse}
              alt={course.title}
              className="w-full h-[425px] object-cover rounded-[15px]"
            />
          </div>
          {/* <div>
            {course.thumbnail ? (
              <img
                src={course.thumbnail || Merncourse}
                alt={course.title}
                className="w-full h-[425px] object-cover rounded-[15px]"
              />
            ) : (
              <div className="w-full h-[350px] bg-gray-200 rounded-[15px] flex items-center justify-center">
                <span className="text-gray-500 font-anik">Course Image</span>
              </div>
            )}
          </div> */}

          {/* Information */}
          <div className="bg-white rounded-[15px] p-8 shadow-sm">
            <p className="text-primary font-anik font-semibold">
              {course.category}
            </p>

            <h1 className="text-3xl font-bold text-primary font-anik mt-2">
              {course.title}
            </h1>

            <p className="text-gray-600 mt-5 leading-7">{course.description}</p>

            <div className="mt-6 space-y-3 font-anik">
              <p>⭐ Rating: {course.rating}</p>

              <p>👨‍🎓 শিক্ষার্থী: {course.students?.length || 0}</p>

              <p>👨‍🏫 Instructor: {course.instructor?.name}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="text-2xl font-bold text-primary">
                ৳ {course.price} BDT
              </p>

              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="bg-primary text-white px-7 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90 disabled:opacity-60"
              >
                {isEnrolling ? "ভর্তি হচ্ছে..." : "কোর্সে ভর্তি হন"}
              </button>
            </div>

            {enrollMessage && (
              <div className="mt-5 bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg font-anik">
                {enrollMessage}
              </div>
            )}
          </div>
        </div>

        {/* Lessons */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary font-anik mb-5">
            কোর্সের লেসন
          </h2>

          {course.lessons && course.lessons.length > 0 ? (
            <div className="space-y-3">
              {course.lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-white rounded-lg p-5 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-primary font-anik">
                      {lesson.order}. {lesson.title}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {lesson.description}
                    </p>
                  </div>

                  <span className="text-gray-500 text-sm">
                    {lesson.duration} min
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-500 font-anik">
                এই কোর্সে এখনো কোনো লেসন যোগ করা হয়নি।
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CourseDetails;
