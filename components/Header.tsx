import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/logo-border.png';

export default function Header() {
  return (
    <div className="flex text-white items-center h-20 p-5 border-b-solid border-b-2 border-b-slate-600">
      <div className="flex items-center justify-center home:ml-5 m-2">
        <Image
          src={logo}
          alt="Logo"
          className="flex h-[60px] home:h-[70px] w-[60px] home:w-[70px] max-sm:hidden"
        />
      </div>
      <div className="flex-1 flex items-center justify-evenly text-lg">
        <div className="nav-link">
          <Link href="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link href="/rules">Rules</Link>
        </div>
        <div className="nav-link">
          <Link href="/videos/D2W/choose">Videos</Link>
        </div>
        <div className="nav-link">
          <Link href="/tools">Tools</Link>
        </div>
      </div>
    </div>
  );
}
