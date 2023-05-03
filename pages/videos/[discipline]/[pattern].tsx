import { useEffect, useState } from 'react';
import VideosSidebar from '../../../components/VideosSidebar';
import { Discipline, Disciplines, Pattern, Video } from '../../../utils/types';
import PatternDisplay from '../../../components/PatternDisplay';
import { NextRouter, useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ensureSingle, getCaseInsensitive } from '../../../utils/utils';
import { parseDisciplines } from '../../../utils/data';

interface Data {
  discipline: Discipline;
  pattern: Pattern;
  video: Video;
}

interface VideosQuery {
  discipline: Discipline['id'];
  pattern: Pattern['id'] | null;
  video: number;
}

interface VideosProps {
  disciplines: Disciplines;
}

function parseQuery(
  { discipline, pattern, video }: NextRouter['query'],
  disciplines: Disciplines
): VideosQuery {
  let resD = disciplines.find((d) =>
    getCaseInsensitive(d.id).includes(ensureSingle(discipline))
  ).id;

  let resP =
    pattern == 'choose'
      ? null
      : disciplines
          .find((d) => d.id == resD)
          .pattern_types.map((t) => t.patterns)
          .flat()
          .find((p) => getCaseInsensitive(ensureSingle(pattern)).includes(p.id))
          ?.id ?? null;

  let resV = parseInt(ensureSingle(video)) || 0;

  return {
    discipline: resD,
    pattern: resP,
    video: resV,
  };
}

export default function Videos({ disciplines }: VideosProps) {
  const router = useRouter();

  const { discipline, pattern, video } = parseQuery(router.query, disciplines);

  const [view, setView] = useState({
    discipline,
    pattern,
    video,
  });
  useEffect(() => {
    setView({
      discipline,
      pattern,
      video,
    });
  }, [router, discipline, pattern, video]);

  const [data, setData] = useState<Data>({
    discipline: null,
    pattern: null,
    video: null,
  });
  useEffect(() => {
    let dataDiscipline = disciplines.find((d) => d.id === discipline),
      dataPattern = dataDiscipline?.pattern_types
        .map((t) => t.patterns)
        .flat()
        .find((p) => p.id === pattern),
      dataVideo = (dataPattern?.videos || [])[video || 0];

    setData({
      discipline: dataDiscipline,
      pattern: dataPattern,
      video: dataVideo,
    });
  },    [disciplines, discipline, pattern, video]);

  return (
    <div className="flex flex-1 flex-row h-full">
      <VideosSidebar disciplines={disciplines} view={view} />
      <PatternDisplay
        discipline={data.discipline}
        pattern={data.pattern}
        video={data.video}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<VideosProps> = async () => {
  return {
    props: {
      disciplines: parseDisciplines(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const disciplines = parseDisciplines();

  return {
    paths: disciplines
      .map((discipline) => {
        const dIDs = getCaseInsensitive(discipline.id);

        return [
          ...discipline.pattern_types.map((type) =>
            type.patterns.map((pattern) =>
              getCaseInsensitive(pattern.id).map((pStr) =>
                dIDs.map((dStr) => ({
                  params: { discipline: dStr, pattern: pStr },
                }))
              )
            )
          ),
          ...dIDs.map((dStr) => ({
            params: { discipline: dStr, pattern: 'choose' },
          })),
        ];
      })
      .flat(5),

    fallback: false,
  };
};
