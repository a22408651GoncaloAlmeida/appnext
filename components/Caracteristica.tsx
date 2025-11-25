import Link from 'next/link';

interface CaracteristicaProps {
  caracteristica: string;
  index: number;
}

export default function Caracteristica({ caracteristica, index }: CaracteristicaProps) {
  return (
    <Link href={`/caracteristica/${index}`}>
      <li className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-blue-200 dark:border-gray-600 cursor-pointer hover:scale-105 transition-transform list-none">
        <span className="text-gray-800 dark:text-gray-200 font-medium">{caracteristica}</span>
      </li>
    </Link>
  );
}
