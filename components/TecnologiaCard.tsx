import Image from 'next/image';
import Link from 'next/link';

interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({ title, image, index }: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologia/${index}`}>
      <div className="w-40 h-40 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center justify-center gap-3 border border-blue-200 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Image
            src={`/tecnologias/${image}`}
            alt={`${title} logo`}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <h3 className="text-center font-semibold text-sm">{title}</h3>
      </div>
    </Link>
  );
}
