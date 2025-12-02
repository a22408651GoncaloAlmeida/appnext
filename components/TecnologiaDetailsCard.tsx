import Image from 'next/image';
import ContadorPersonalizado from './ContadorPersonalizado'

interface TecnologiaDetailsCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-8 border border-blue-200 dark:border-gray-600 max-w-2xl w-full">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <Image
            src={`/tecnologias/${image}`}
            alt={`${title} logo`}
            width={128}
            height={128}
            className="object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold text-center">{title}</h1>

        <p className="text-center text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-blue-200 dark:border-gray-600 w-full justify-center">
          <div className="flex gap-1">
            {Array.from({ length: Math.round(rating) }).map((_, i) => (
              <span key={i} className="text-2xl">
                ⭐
              </span>
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            ({rating}/5)
          </span>
        </div>
        <div className="mt-4">
          <ContadorPersonalizado title={title} />
        </div>
      </div>
    </div>
  );
}
