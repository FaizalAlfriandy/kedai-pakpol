import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-mocha-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Tentang Kedai Pakpol</h1>
            <div className="w-20 h-1 bg-mocha-600 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="md:w-1/2">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image src="/kita.jpg" alt="Kedai Pakpol" fill className="object-cover" />
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sejarah Kedai Pakpol</h2>
              <p className="text-gray-600 mb-4">
                Kedai Pakpol didirikan pada tahun 2020 oleh Pak Pol, seorang mantan koki hotel yang memiliki impian
                untuk menyediakan makanan berkualitas dengan harga terjangkau bagi mahasiswa.
              </p>
              <p className="text-gray-600 mb-4">
                Berawal dari sebuah gerobak kecil di depan kampus, Kedai Pakpol kini telah berkembang menjadi tempat
                makan favorit mahasiswa dengan berbagai menu lezat dan harga yang bersahabat.
              </p>
              <p className="text-gray-600 mb-4">
                Filosofi kami sederhana: menyajikan makanan enak, mengenyangkan, dan terjangkau dengan pelayanan yang
                ramah dan cepat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-mocha-600 font-bold text-xl mb-1">5+</div>
              <div className="text-gray-600">Tahun Pengalaman</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-mocha-600 font-bold text-xl mb-1">1000+</div>
              <div className="text-gray-600">Pelanggan Puas</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-mocha-600 font-bold text-xl mb-1">15+</div>
              <div className="text-gray-600">Menu Spesial</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-mocha-600 font-bold text-xl mb-1">4.8</div>
              <div className="text-gray-600">Rating Pelanggan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
