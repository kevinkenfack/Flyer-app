import ImageUploader from '@/components/ImageUploader'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <ImageUploader />
      </div>
    </main>
  )
}