import ReactPlayer from 'react-player';
import { Discipline, Pattern, Video } from '../utils/types';

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
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col p-10 gap-10">
        {pattern ? (
          <>
            <h1 className="flex text-textBright text-2xl">{`${pattern.name} (${discipline.id})`}</h1>
            {video && (
              <div className="player-wrapper">
                <ReactPlayer
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={video.url}
                  controls
                  volume={1}
                  muted
                  pip
                />
              </div>
            )}
            <p className="flex text-textBright text-md">
              {pattern.description}
            </p>
          </>
        ) : (
          <h1 className="flex text-textBright text-2xl">Choose a pattern</h1>
        )}
      </div>
    </div>
  );
}
