import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import Link from 'next/link';

interface LinkButtonProps {
  label: string;
  url?: string;
  onClick?: () => void;
}

export default function LinkButton({ label, url, onClick }: LinkButtonProps) {
  return (
    <Link
      className="flex flex-1 gap-4 items-center justify-start"
      href={url}
      target={isAbsoluteUrl(url) ? '_blank' : '_self'}
    >
      <button
        className="flex flex-grow justify-center rounded-md bg-bgActive hover:bg-bgHover transition-colors"
        onClick={onClick}
      >
        <p className="mx-5 my-2 text-lg">{label}</p>
      </button>
    </Link>
  );
}
