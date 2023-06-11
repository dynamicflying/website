import ReactPlayer from 'react-player';
import { Discipline, Pattern, Video } from '../utils/types';
import { Markdown } from '../utils/utils';
import { createRef, useState } from 'react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { customColors } from '../utils/theme';
import Select from './Select';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface PatternDisplayProps {
  discipline: Discipline;
  pattern: Pattern;
  video: Video;
}

export default function PatternDisplay({
  discipline,
  pattern,
  video,
}: PatternDisplayProps) {
  const ref = createRef<ReactPlayer>();
  const [slowmo, setSlowmo] = useState(false);
  const [clip, setClip] = useState<number | null>(null);

  const router = useRouter();

  const toggleSlowmo = () => {
    setSlowmo(!slowmo);
    ref.current.setState({ playbackRate: !slowmo ? 0.5 : 1 });
  };

  const handleStart = () => {
    if (video.clips) {
      setClip(0);
      ref.current.seekTo(video.clips[0][0], 'seconds');
    }
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (video.clips && clip != null) {
      if (playedSeconds > video.clips[clip][1]) {
        const nextClip = (clip + 1) % video.clips.length;

        setClip(nextClip);
        ref.current.seekTo(video.clips[nextClip][0], 'seconds');

        if (nextClip === 0) toggleSlowmo();
      } else if (playedSeconds < video.clips[clip][0] && clip != null) {
        const prevClip = (clip - 1 + video.clips.length) % video.clips.length;

        setClip(prevClip);
        ref.current.seekTo(video.clips[prevClip][0], 'seconds');

        if (prevClip === video.clips.length - 1) toggleSlowmo();
      }
    }
  };

  return (
    <div className="flex flex-row h-full text-textBright">
      <div className="flex flex-col p-2 sm:p-10 gap-10">
        {pattern ? (
          <>
            <h1 className="flex text-2xl">{`${pattern.name} (${discipline.id})`}</h1>
            {video && (
              <div className="player-wrapper">
                <ReactPlayer
                  ref={ref}
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={video.url}
                  controls
                  volume={1}
                  muted
                  pip
                  onProgress={handleProgress}
                  onStart={handleStart}
                  playing
                  playbackRate={slowmo ? 0.5 : 1}
                />
                {/* <iframe width="560" height="315" src="https://www.youtube.com/watch?v=0BDL6auws08&list=PLsmusSbOACFP3RlBqo-HIuP-nKVeuslEE&index=34" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
              </div>
            )}
            {video && pattern.videos?.length > 1 && (
              <Select
                options={pattern.videos.map((v, i) => ({
                  value: i.toString(),
                  label: v.variant,
                }))}
                defaultValue={pattern.videos
                  .findIndex((v) => v.url === video.url)
                  .toString()}
                onChange={(i) => {
                  router.push(
                    `/videos/${discipline.id}/${pattern.id}?video=${i}`
                  );
                  setClip(0);
                  setSlowmo(false);
                }}
              />
            )}
            <p className="flex text-md">
              {typeof pattern.description == 'string' ? (
                <Markdown md={pattern.description} />
              ) : (
                <DescriptionTable sections={pattern.description} />
              )}
            </p>
            {pattern.remarks && (
              <div className="flex text-md border flex-col ">
                <Markdown
                  className="remarks [&>h1]:text-center [&>p>del]:text-red-500 [&>h3]:pt-5 p-2"
                  md={pattern.remarks}
                />
              </div>
            )}
          </>
        ) : (
          <h1 className="flex text-2xl">Choose a pattern</h1>
        )}
      </div>
    </div>
  );
}

interface DescriptionTableProps {
  sections: Exclude<Pattern['description'], string>;
}

function DescriptionTable({ sections }: DescriptionTableProps) {
  return (
    <table className="table-auto">
      <tbody>
        {sections.map((section) => (
          <tr
            key={section.title}
            className="max-sm:flex max-sm:flex-col max-sm:mb-5"
          >
            <td className="px-4 py-2 font-bold align-top">{section.title}</td>
            <td className="px-4 py-2">
              <Markdown md={section.text} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
