import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";

type Lesson = {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
};

type Instructor = {
  _id: string;
  name: string;
  email: string;
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
  students?: string[];
  lessons?: Lesson[];
};

const CourseManagement = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError("");

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <p className="font-anik text-gray-600">কোর্স লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <p className="text-red-500 font-anik">
            {error || "কোর্স পাওয়া যায়নি"}
          </p>

          <Link
            to="/instructor/dashboard"
            className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik"
          >
            ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary font-anik">
              কোর্স ম্যানেজমেন্ট
            </h1>

            <p className="text-gray-500 font-anik mt-1">{course.title}</p>
          </div>

          <Link
            to="/instructor/dashboard"
            className="text-primary font-anik font-semibold hover:underline"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Course Information */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div className="w-full md:w-[300px] shrink-0">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 font-anik">Course Image</span>
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-anik">
                {course.category}
              </p>

              <h2 className="text-2xl font-bold text-primary font-anik mt-1">
                {course.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {course.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div>
                  <p className="text-sm text-gray-500 font-anik">Students</p>

                  <p className="text-xl font-bold text-primary">
                    {course.students?.length || 0}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-anik">Lessons</p>

                  <p className="text-xl font-bold text-primary">
                    {course.lessons?.length || 0}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-anik">Price</p>

                  <p className="text-xl font-bold text-primary">
                    ৳ {course.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-primary font-anik">
                কোর্সের লেসন
              </h2>

              <p className="text-gray-500 font-anik mt-1">
                {course.lessons?.length || 0} টি লেসন
              </p>
            </div>

            <Link
              to={`/instructor/courses/${course._id}/lessons/create`}
              className="bg-primary text-white px-5 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90"
            >
              + নতুন লেসন
            </Link>
          </div>

          {/* No Lessons */}
          {!course.lessons || course.lessons.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
              <h3 className="text-xl font-semibold text-primary font-anik">
                এখনো কোনো লেসন নেই
              </h3>

              <p className="text-gray-500 mt-2 font-anik">
                এই কোর্সের জন্য প্রথম লেসন তৈরি করুন।
              </p>

              <Link
                to={`/instructor/courses/${course._id}/lessons/create`}
                className="inline-block mt-5 bg-primary text-white px-6 py-3 rounded-lg font-anik font-semibold cursor-pointer hover:opacity-90"
              >
                + নতুন লেসন তৈরি করুন
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {course.lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-white rounded-xl shadow-sm p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex gap-4">
                        {/* Order */}
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                          {lesson.order}
                        </div>

                        {/* Lesson Info */}
                        <div>
                          <h3 className="text-lg font-bold text-primary font-anik">
                            {lesson.title}
                          </h3>

                          <p className="text-gray-500 text-sm mt-1">
                            {lesson.description}
                          </p>

                          <p className="text-gray-400 text-sm mt-2">
                            Duration: {lesson.duration} minutes
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="border border-primary text-primary px-4 py-2 rounded-lg font-anik font-semibold cursor-pointer hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="border border-red-500 text-red-500 px-4 py-2 rounded-lg font-anik font-semibold cursor-pointer hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CourseManagement;
