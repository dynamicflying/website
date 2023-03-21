import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DEFAULT_DISCIPLINE } from '../../utils/constants';

export default function VideosRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/videos/${DEFAULT_DISCIPLINE}/choose`);
  });

  return <div></div>;
}
