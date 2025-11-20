import MagiaDoJSX from "@/components/MagiaDoJSX"

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2>Interfaces Modernos</h2>
        <p>Bem vindos à minha app em React e Next.js.</p>
      </div>
      <MagiaDoJSX />
      <a
        href="https://vercel.com/new"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Deploy Now
      </a>

    </div>
  )
}