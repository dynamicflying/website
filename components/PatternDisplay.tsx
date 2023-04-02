import ReactPlayer from 'react-player';
import { Discipline, Pattern, Video } from '../utils/types';
import { Markdown } from '../utils/utils';

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
    <div className="flex flex-row h-full text-textBright">
      <div className="flex flex-col p-10 gap-10">
        {pattern ? (
          <>
            <h1 className="flex text-2xl">{`${pattern.name} (${discipline.id})`}</h1>
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
          <tr key={section.title}>
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
