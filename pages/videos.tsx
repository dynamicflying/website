import { useState } from 'react';
import * as fs from 'fs';
import * as path from 'path';
import YAML from 'yaml';
import VideosSidebar from '../components/VideosSidebar';
import { Disciplines } from '../utils/types';

export default function Videos({ disciplines }: { disciplines: Disciplines }) {
  const [view, setView] = useState({
    discipline: 'D2W' as keyof Disciplines,
    pattern: null as string,
  });

  return (
    <div className="flex flex-row">
      <VideosSidebar disciplines={disciplines} viewState={[view, setView]} />
      <div className="flex">
        {view.discipline} {view.pattern}
      </div>
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
