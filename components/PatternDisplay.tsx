import ReactPlayer from 'react-player';
import { Discipline, Pattern, Video } from '../utils/types';
import { Markdown } from '../utils/utils';
import { createRef, useState } from 'react';
import Select from './Select';
import { useRouter } from 'next/router';

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

  const playClip = (i: number) => {
    setClip(i);
    ref.current.seekTo(video.clips[i][0], 'seconds');
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (video.clips && clip != null) {
      if (playedSeconds > video.clips[clip][1]) {
        const nextClip = slowmo ? (clip + 1) % video.clips.length : clip;

        playClip(nextClip);
        toggleSlowmo();
      } else if (playedSeconds < video.clips[clip][0] && clip != null) {
        const prevClip = slowmo
          ? (clip - 1 + video.clips.length) % video.clips.length
          : clip;

        playClip(prevClip);
        toggleSlowmo();
      }
    }
  };

  return (
    <div className="flex flex-row h-full text-textBright">
      <div className="flex flex-col p-2 sm:p-10 gap-10">
        {pattern ? (
          <>
            <h1 className="flex text-2xl">{`${pattern.id} - ${pattern.name} (${discipline.id})`}</h1>
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
                  progressInterval={250}
                />
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
