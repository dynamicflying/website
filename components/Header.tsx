import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/assets/logo.png';

export default function Header() {
  return (
    <div className="flex text-white h-20 p-5">
      {/* add a logo to the left using next/image */}
      <div className="flex items-center justify-center">
        <Image src={logo} alt="Logo" width={80} height={80} />
      </div>
      {/* add a menu to the right */}
      <div className="flex-1 flex items-center justify-center gap-[7rem] text-lg">
        {/* create 4 nav links: home, rules, videos, tools */}
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
