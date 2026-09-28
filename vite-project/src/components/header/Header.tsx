import { useState } from "react"
import { Link } from "react-router-dom"
import Container from "../common/Container"
import ListItem from "../ui/ListItem"
import type { NavList } from "../../types/navItemtype"
import Flex from "../ui/Flex"
import { IoMdMenu } from "react-icons/io"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navList: NavList[] = [
    {
      id: 1,
      title: "হোম",
    },
    {
      id: 2,
      title: "আমাদের কোর্সসমূহ",
    },
    {
      id: 3,
      title: "যোগাযোগ",
    },
    {
      id: 4,
      title: "ক্যারিয়ার গাইডলাইন",
    },
  ]

  return (
    <header className="bg-primary text-white">
      <nav className="relative">
        <Container>
          <Flex className="min-h-[88px] justify-between items-center gap-6">
            {/* Logo */}
            <Link
              to="/"
              className="shrink-0 flex items-center"
            >
              <img
                src="/images/logo.png"
                alt="কোড দুনিয়া"
                className="w-[150px] lg:w-[175px] h-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navList.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  className={`text-lg xl:text-xl font-semibold font-anik px-4 py-3 rounded-lg transition ${
                    item.id === 1
                      ? "bg-white/10"
                      : "hover:bg-white/10"
                  }`}
                />
              ))}
            </ul>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Login */}
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg border-2 border-white text-white text-lg font-semibold font-anik hover:bg-white hover:text-primary transition duration-200"
              >
                লগইন
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-lg bg-secondary text-white text-lg font-semibold font-anik hover:opacity-90 transition duration-200"
              >
                রেজিস্টার
              </Link>

              {/* Courses */}
              <Link
                to="/courses"
                className="px-6 py-2.5 rounded-lg bg-secondary text-white text-lg font-semibold font-anik hover:opacity-90 transition duration-200"
              >
                কোর্স দেখুন
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-3xl cursor-pointer"
              aria-label="Toggle menu"
            >
              <IoMdMenu />
            </button>
          </Flex>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full z-50 bg-primary shadow-lg border-t border-white/10">
              <div className="px-5 py-5">
                <ul className="space-y-2">
                  {navList.map((item) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      className="text-xl font-semibold font-anik px-4 py-3 rounded-lg hover:bg-white/10 transition"
                    />
                  ))}
                </ul>

                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-white/10">
                  {/* Login */}
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center px-4 py-3 rounded-lg border-2 border-white text-white font-semibold font-anik hover:bg-white hover:text-primary transition"
                  >
                    লগইন
                  </Link>

                  {/* Register */}
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-center px-4 py-3 rounded-lg bg-secondary text-white font-semibold font-anik hover:opacity-90 transition"
                  >
                    রেজিস্টার
                  </Link>

                  {/* Courses */}
                  <Link
                    to="/courses"
                    onClick={() => setIsOpen(false)}
                    className="col-span-2 text-center px-4 py-3 rounded-lg bg-secondary text-white font-semibold font-anik hover:opacity-90 transition"
                  >
                    কোর্স দেখুন
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </nav>
    </header>
  )
}

export default Header