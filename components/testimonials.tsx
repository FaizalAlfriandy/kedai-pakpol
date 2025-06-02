import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "M. Ariq Arayan",
    role: "Mahasiswa MI",
    content:
      "Saya suka makan nasi goreng disini, enak, murah dan mengenyangkan",
    avatar: "/ariq.jpg",
  },
  {
    id: 2,
    name: "M. Faizal Alfriandy",
    role: "Mahasiswa MI",
    content:
      "Saya biasanya bareng temen makan disini, bakso gorengnya enak banget sambil nungguin mereka makan hihi",
    avatar: "/faizal.jpg",
  },
  {
    id: 3,
    name: "Adin Ramdan Farelino",
    role: "EL GPT",
    content:
      "Es rencengannya segar dan bakso gorengnya renyah. Tempatnya juga nyaman untuk nongkrong sambil nunggu jam istirahat berakhir",
    avatar: "/adin.jpg",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-mocha-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Apa Kata Mereka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman pelanggan kami yang telah menikmati makanan lezat dari Kedai Pakpol.
          </p>
          <div className="w-20 h-1 bg-mocha-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
