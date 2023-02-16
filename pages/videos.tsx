import { useEffect, useState } from 'react';
import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';
import VideosSidebar from '../components/VideosSidebar';
import { Discipline, Disciplines, Pattern, Video } from '../utils/types';
import PatternDisplay from '../components/PatternDisplay';

interface Data {
  discipline: Discipline;
  pattern: Pattern;
  video: Video;
}

export default function Videos({ disciplines }: { disciplines: Disciplines }) {
  const [data, setData] = useState<Data>({
    discipline: null,
    pattern: null,
    video: null,
  });
  const [view, setView] = useState({
    discipline: 'D2W',
    type: null as string,
    pattern: null as string,
    video: null as number,
  });

  useEffect(() => {
    console.log(view);
    let discipline = disciplines.find((d) => d.id === view.discipline),
      pattern = discipline?.pattern_types
        .find((t) => t.name === view.type)
        ?.patterns.find((p) => p.id === view.pattern),
      video = (pattern?.videos || [])[view.video || 0];

    setData({
      discipline,
      pattern,
      video,
    });
  }, [view, disciplines]);

  return (
    <div className="flex flex-1 flex-row h-full">
      <VideosSidebar disciplines={disciplines} viewState={[view, setView]} />
      <PatternDisplay
        discipline={data.discipline}
        pattern={data.pattern}
        video={data.video}
      />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      disciplines: YAML.parse(
        fs.readFileSync(
          path.join(process.cwd(), 'data/disciplines.yml'),
          'utf8'
        )
      ) as Disciplines,
    },
  };
}
