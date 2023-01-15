import { useState } from 'react';
import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';
import VideosSidebar from '../components/VideosSidebar';
import { Disciplines } from '../utils/types';
import PatternDisplay from '../components/PatternDisplay';

export default function Videos({ disciplines }: { disciplines: Disciplines }) {
  const [view, setView] = useState({
    discipline: 'D2W' as keyof Disciplines,
    category: null as keyof Disciplines['D2W']['patterns'],
    pattern: null as string,
  });

  return (
    <div className="flex flex-1 flex-row h-full">
      <VideosSidebar disciplines={disciplines} viewState={[view, setView]} />
      <PatternDisplay
        discipline={view.discipline}
        pattern={
          view.pattern
            ? disciplines[view.discipline].patterns[view.category][view.pattern]
            : null
        }
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
