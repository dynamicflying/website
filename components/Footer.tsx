import { shuffleArray } from '../utils/utils';
import ChangingFlag from './ChangingFlag';
import { customColors } from '../utils/theme';

const logos = {
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      fill={customColors.text}
      width="20"
    >
      <title>{'Facebook'}</title>
      <path
        d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
        fillRule="evenodd"
      />
    </svg>
  ),
  mail: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      fill={customColors.text}
      width="20"
    >
      <title>{'Mail'}</title>
      <path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <div className="flex text-text h-20 p-5 mt-auto items-center justify-evenly text-base border-t-solid border-t-2 border-t-slate-600">
      {/* A paragrah with a copyright symbol, the current year */}
      <p>© {new Date().getFullYear()} Dynamic Flying</p>
      <div className="flex gap-3">
        <a href="mailto:isc-dynamic@fai.org" target="_blank">
          {logos.mail}
        </a>
        <a href="https://www.facebook.com/DynamicFlyingDF" target="_blank">
          {logos.facebook}
        </a>
      </div>
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
