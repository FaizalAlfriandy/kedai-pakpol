import Hero from "@/components/hero"
import Menu from "@/components/menu"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Contact />
    </div>
  )
}
