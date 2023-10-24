import ReactPlayer from 'react-player';
import { Discipline, Pattern, Video } from '../utils/types';
import { Markdown } from '../utils/utils';
import { createRef, useEffect, useState } from 'react';
import Select from './Select';
import { useRouter } from 'next/router';
import Switch from './Switch';

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
  const [autoClips, setAutoClips] = useState(true);
  const [autoSlowmo, setAutoSlowmo] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('autoClips') === 'false') {
      setAutoClips(false);
    }
    if (localStorage.getItem('autoSlowmo') === 'false') {
      setAutoSlowmo(false);
    }
  }, [])

  const router = useRouter();

  const toggleSlowmo = () => {
    setSlowmo(curr => !curr);
    ref.current.setState({ playbackRate: !slowmo ? 0.5 : 1 });
  };

  const handleStart = () => {
    if (video.clips) {
      setClip(0);
      ref.current.seekTo(video.clips[0][0], 'seconds');
      setSlowmo(false)
    }
  };

  const playClip = (i: number) => {
    setClip(i);
    ref.current.seekTo(video.clips[i][0], 'seconds');
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (video.clips && clip != null && autoClips) {
      const changeClip = !autoSlowmo || slowmo;

      if (playedSeconds > video.clips[clip][1]) {
        const nextClip = changeClip ? (clip + 1) % video.clips.length : clip;

        playClip(nextClip);
        if (autoSlowmo)
          toggleSlowmo();
      } else if (playedSeconds < video.clips[clip][0] && clip != null) {
        const prevClip = changeClip
          ? (clip - 1 + video.clips.length) % video.clips.length
          : clip;

        playClip(prevClip);
        if (autoSlowmo)
          toggleSlowmo();
      }
    }
  };

  return (
    <div className="flex flex-row h-full text-textBright">
      <div className="flex flex-col p-2 sm:p-10 gap-10">
        {pattern ? (
          <>
            <h1 className="flex text-2xl">{`${!pattern.transition ? pattern.id + ' - ' : ''
              }${pattern.name} (${discipline.id})`}</h1>
            {video && (
              <div>
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
                <div className='m-3 flex flex-col min-[450px]:flex-row gap-5'>
                  <Switch
                    checked={autoClips}
                    disabled={!video.clips}
                    label="Auto-play clips"
                    onCheckedChange={(checked) => {
                      setAutoClips(checked);
                      localStorage.setItem('autoClips', checked.toString());
                      setSlowmo(false);
                    }
                    }
                  />
                  <Switch
                    checked={autoSlowmo && autoClips}
                    disabled={!video.clips || !autoClips}
                    label="Auto-play slowmo"
                    onCheckedChange={(checked) => {
                      setAutoSlowmo(checked);
                      localStorage.setItem('autoSlowmo', checked.toString());
                      if (!checked)
                        setSlowmo(false);
                    }
                    }
                  />
                </div>
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
