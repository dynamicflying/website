import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/assets/logo.png';

export default function Header() {
  return (
    <div className="flex text-white h-20 p-5 border-b-solid border-b-2 border-b-slate-600">
      <div className="flex items-center justify-center ml-5">
        <Image src={logo} alt="Logo" width={80} height={80} />
      </div>
      <div className="flex-1 flex items-center justify-center gap-[7rem] text-lg">
        <div className="nav-link">
          <Link href="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link href="/rules">Rules</Link>
        </div>
        <div className="nav-link">
          <Link href="/videos">Videos</Link>
        </div>
        <div className="nav-link">
          <Link href="/tools">Tools</Link>
        </div>
      </div>
    </div>
  );
}
