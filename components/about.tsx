import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 warm-gradient"></div>

      {/* Decorative autumn elements */}
      <div className="absolute top-10 right-10 text-4xl opacity-20 animate-float">🍂</div>
      <div className="absolute bottom-10 left-10 text-5xl opacity-15 animate-bounce">🍁</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Tentang Kedai Pakpol</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image src="/kita.jpg" alt="Kedai Pakpol" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-transparent"></div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="card-gradient p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold gradient-text mb-4">Kantin Mahasiswa Terbaik</h3>
              <p className="text-gray-700 mb-4">
                Kedai Pakpol adalah tempat favorit mahasiswa untuk menikmati makanan lezat dengan harga terjangkau. Kami
                memahami kebutuhan mahasiswa akan makanan yang mengenyangkan namun tetap ramah di kantong.
              </p>
              <p className="text-gray-700 mb-4">
                Berdiri sejak tahun 2020, Kedai Pakpol telah melayani ribuan mahasiswa dengan menu-menu andalan seperti
                Bakso Goreng, Ayam Geprek, Mie Ayam, dan Es Rencengan yang menyegarkan.
              </p>
              <p className="text-gray-700 mb-6">
                Kami berkomitmen untuk selalu menyajikan makanan berkualitas dengan bahan-bahan segar dan proses memasak
                yang higienis. Kenyamanan dan kepuasan pelanggan adalah prioritas utama kami.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-4 rounded-lg shadow-md border border-orange-200">
                  <div className="text-orange-600 font-bold text-xl mb-1">5+</div>
                  <div className="text-gray-700">Tahun Pengalaman</div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-orange-100 p-4 rounded-lg shadow-md border border-red-200">
                  <div className="text-red-600 font-bold text-xl mb-1">1000+</div>
                  <div className="text-gray-700">Pelanggan Puas</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg shadow-md border border-yellow-200">
                  <div className="text-yellow-600 font-bold text-xl mb-1">15+</div>
                  <div className="text-gray-700">Menu Spesial</div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-lg shadow-md border border-orange-200">
                  <div className="text-orange-600 font-bold text-xl mb-1">4.8</div>
                  <div className="text-gray-700">Rating Pelanggan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
