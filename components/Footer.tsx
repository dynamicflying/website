import Link from 'next/link';
import { shuffleArray } from '../utils/utils';
import ChangingFlag from './ChangingFlag';

export default function Footer() {
  return (
    <div className="flex text-text h-20 p-5 mt-auto items-center justify-evenly text-base">
      {/* A paragrah with a copyright symbol, the current year */}
      <p>© {new Date().getFullYear()} Dynamic Flying</p>
      <div>logos</div>
      <div className="flex items-center gap-2">
        <p>{'<>'} with ❤️ in </p>
        <ChangingFlag
          countries={shuffleArray(['IT', 'US', 'FR', 'NO', 'AT', 'CZ'])}
          seconds={7}
        />
      </div>
    </div>
  );
}
